import sys
import math

class Node(object):
    def __init__(self):
        self.data = None
        self.parent = None
        self.children = []

def parseTopics(topicRawStr):
    """ parse topics string and return tree """

    terms = topicRawStr.strip().split(' ')
    root = Node()
    root.data = terms[0]

    insertParent = root
    insertLocation = insertParent.children
    
    for term in terms[2:]:
        if term == '(':
            insertParent = insertLocation[-1]
            insertLocation = insertParent.children
        elif term == ')':
            insertParent = insertParent.parent;

            if insertParent is None:
                return root

            insertLocation = insertParent.children
        else:
            newNode = Node()
            newNode.data = term
            newNode.parent = insertParent

            insertLocation.append(newNode)

def hashTree(tree):
    """ takes tree from parseTopics() and returns hash table with all nodes """
    table = {}

    stack = [tree]

    while len(stack) > 0:
        node = stack.pop()
        stack.extend(node.children)
        
        table[node.data] = node

    return table

def getMatchingTopics(topic, htable):
    """ returns all matching topics for a given topic (the topic's subtree)"""
    topics = []

    topicNode = htable[topic]
    stack = [topicNode]

    while len(stack) > 0:
        node = stack.pop()
        stack.extend(node.children)

        topics.append(node.data)    

    return topics

def binarySearchStringPrefix(pre, arr):
    """ binary search on array of string using a string prefix as a key """
    imin = 0
    imax = len(arr) - 1

    while imin <= imax:
        imid = int(math.ceil((imin + imax) / 2))
        if arr[imid][1].startswith(pre):
            return imid
        elif pre < arr[imid][1]:
            imax = imid - 1
        else:
            imin = imid + 1

    return -1

numTopics = int(sys.stdin.readline())
topics = sys.stdin.readline()
topicTree = parseTopics(topics)
htable = hashTree(topicTree)

numQuestions = int(sys.stdin.readline())

questions = []
for i in range(numQuestions):
    topic, question = sys.stdin.readline().split(": ")
    questions.append((topic, question))
questions = sorted(questions, key=lambda x: x[1])

numQueries = int(sys.stdin.readline())

for i in range(numQueries):
    topic, query = sys.stdin.readline().strip().split(" ", 1)
    matchingTopics = getMatchingTopics(topic, htable)
    matchIndex = binarySearchStringPrefix(query, questions)
    matchCount = 0

    if matchIndex == -1:
        print(0)
        continue
    
    """
    scanIndex = matchIndex
    # scan right of scanIndex for matches
    while scanIndex < len(questions) and questions[scanIndex][1].startswith(query):
        if topic in matchingTopics:
            matchCount = matchCount + 1

        scanIndex = scanIndex + 1

    scanIndex = matchIndex - 1
    # scan left of scanIndex for matches
    while scanIndex >= 0 and questions[scanIndex][1].startswith(query):
        if topic in matchingTopics:
            matchCount = matchCount + 1

        scanIndex = scanIndex - 1
    """
