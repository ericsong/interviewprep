from datetime import datetime
import sys
import math

tstart = datetime.now()
maxheight = 0

class TrieNode(object):
    def __init__(self, c):
        self.char = c
        self.children = {}

class Node(object):
    def __init__(self):
        self.topic = None
        self.prefixTree = TrieNode(None)
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

def getMatchingTopics(topic, htable):
    """ returns all matching topics for a given topic (the topic's subtree)"""
    topics = []

    topicNode = htable[topic]
    stack = [topicNode]

    while len(stack) > 0:
        node = stack.pop()
        stack.extend(node.children)

        topics.append(node.topic)

    return topics

def hashTree(tree):
    """ takes tree from parseTopics() and returns hash table with all nodes """
    table = {}

    stack = [tree]

    while len(stack) > 0:
        node = stack.pop()
        stack.extend(node.children)
        
        table[node.topic] = node

    return table

def addTrieNode(node, text, topic):
    for c in text:
        if c in node.children:
            node = node.children[c]
        else:
            node.children[c] = TrieNode(c)
            node = node.children[c]

    if 'EOW' in node.children:
        node.children['EOW'] = node.children['EOW'] + 1
    else:
        node.children['EOW'] = 1

def getPrefixMatchesCount(node, query):
    matchCount = 0
    
    for c in query:
        if c in node.children:
            node = node.children[c]
        else:
            return 0

    return node.count

def getMatchesInTree(tree, query):
    matchCount = 0
    stack = [tree]

    xstart = datetime.now()
    while len(stack) > 0:
        node = stack.pop()
        stack.extend(node.children)
        tstart = datetime.now()
        matchCount = matchCount + getPrefixMatchesCount(node.prefixTree, query)
        td = datetime.now() - tstart
    xd = datetime.now() - xstart
    return matchCount

def precomputePrefixTree(node):
    if(type(node) is int):
        return node
    else:
        count = 0
        for child in node.children:
            count = count + precomputePrefixTree(node.children[child])
        node.count = count
        return count

def precomputeQuestions(node):
    stack = [node]

    while len(stack):
        node = stack.pop()
        stack.extend(node.children)
        precomputePrefixTree(node.prefixTree)

numTopics = int(sys.stdin.readline())
topics = sys.stdin.readline()
topicTree = parseTopics(topics)
htable = hashTree(topicTree)

numQuestions = int(sys.stdin.readline())
for i in range(numQuestions):
    topic, question = sys.stdin.readline().split(": ")
    addTrieNode(htable[topic].prefixTree, question, topic)

precomputeQuestions(topicTree)

numQueries = int(sys.stdin.readline())
for i in range(numQueries):
    topic, query = sys.stdin.readline().strip().split(" ", 1)
    temp = getMatchesInTree(htable[topic], query)
    print(temp)
