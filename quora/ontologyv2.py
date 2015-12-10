from datetime import datetime
import sys
import math

tstart = datetime.now()
maxheight = 0

class Node(object):
    def __init__(self):
        self.topic = None
        self.questions = []
        self.parent = None
        self.children = []

def parseTopics(topicRawStr):
    global maxheight
    """ parse topics string and return tree """

    terms = topicRawStr.strip().split(' ')
    root = Node()
    root.topic = terms[0]
    root.level = 0

    insertParent = root
    insertLocation = insertParent.children
    level = 1

    for term in terms[2:]:
        if term == '(':
            insertParent = insertLocation[-1]
            insertLocation = insertParent.children
            level = level + 1

            if level > maxheight:
                maxheight = level
        elif term == ')':
            level = level - 1
            insertParent = insertParent.parent;

            if insertParent is None:
                return root

            insertLocation = insertParent.children
        else:
            newNode = Node()
            newNode.topic = term
            newNode.parent = insertParent
            newNode.level = level

            insertLocation.append(newNode)

def hashTree(tree):
    """ takes tree from parseTopics() and returns hash table with all nodes """
    table = {}

    stack = [tree]

    while len(stack) > 0:
        node = stack.pop()
        stack.extend(node.children)
        
        table[node.topic] = node

    return table

def sortTreeTopics(tree):
    stack = [tree]

    while len(stack) > 0:
        node = stack.pop()
        stack.extend(node.children)

        node.questions.sort()

def countNodes(tree):
    count = 0

    for child in tree.children:
        count = count + countNodes(child)
    
    tree.count = count

    return count

def binarySearchStringPrefix(arr, pre):
    """ binary search on array of string using a string prefix as a key """
    imin = 0
    imax = len(arr) - 1

    while imin <= imax:
        imid = int(math.ceil((imin + imax) / 2))
        if arr[imid].startswith(pre):
            return imid
        elif pre < arr[imid]:
            imax = imid - 1
        else:
            imin = imid + 1

    return -1

def getMatchesCount(arr, query):
    matchCount = 0
    matchIndex = binarySearchStringPrefix(arr, query)

    if matchIndex == -1:
        return 0

    # scan right of scanIndex for matches
    scanIndex = matchIndex
    while scanIndex < len(arr) and arr[scanIndex].startswith(query):
        matchCount = matchCount + 1
        scanIndex = scanIndex + 1

    # scan left of scanIndex for matches
    scanIndex = matchIndex - 1
    while scanIndex >= 0 and arr[scanIndex].startswith(query):
        matchCount = matchCount + 1
        scanIndex = scanIndex - 1

    return matchCount

def getMatchesInTree(tree, query):
    matchCount = 0
    stack = [tree]

    while len(stack) > 0:
        node = stack.pop()
        stack.extend(node.children)
        #matchCount = matchCount + getMatchesCount(node.questions, query)
    return matchCount

numTopics = int(sys.stdin.readline())
topics = sys.stdin.readline()
topicTree = parseTopics(topics)
htable = hashTree(topicTree)

numQuestions = int(sys.stdin.readline())
for i in range(numQuestions):
    topic, question = sys.stdin.readline().split(": ")
    htable[topic].questions.append(question)

sortTreeTopics(topicTree)

numQueries = int(sys.stdin.readline())
for i in range(numQueries):
    topic, query = sys.stdin.readline().strip().split(" ", 1)
    tstart = datetime.now()
    getMatchesInTree(htable[topic], query)
    td = datetime.now() - tstart
    print(str(td.microseconds) + " \t: " + str(maxheight - htable[topic].level) + "\t: " + str(len(htable[topic].children)))
