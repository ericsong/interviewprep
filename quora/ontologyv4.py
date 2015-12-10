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
        self.someval = 2

class TrieNode(object):
    def __init__(self, c):
        self.char = c
        self.children = {}
        self.topics = {}

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

def addTrieNode(node, text, topics):
    for c in text:
        if c in node.children:
            node = node.children[c]
        else:
            node.children[c] = TrieNode(c)
            node = node.children[c]

    if 'EOW' not in node.children:
        node.children['EOW'] = []

    node.children['EOW'].extend(topics)
    """
    for topic in topics:
        count = node.children['EOW'].get(topic)
        if count:
            node.children['EOW'][topic] = count + 1
        else:
            node.children['EOW'][topic] = 1
    """

def expandTopics(topics, htable):
    for topic in topics:
        runner = htable[topic]

        stack = [runner]

        while len(stack):
            node = stack.pop()
            stack.extend(node.children)
            node.someval = node.someval + 1

def getPrefixMatchesCount(node, query, topics):
    matchCount = 0
   
    for c in query:
        if c in node.children:
            node = node.children[c]
        else:
            return 0

    tstart = datetime.now()
    print('topic len : ' + str(len(topics)))
    print('node topics len : ' + str(len(node.topics)))
    for topic in topics:
        count = node.topics.get(topic)
        if count:
            matchCount = matchCount + count
    tend = datetime.now() - tstart

    print('count add: ' + str(tend.microseconds))
    return matchCount

numTopics = int(sys.stdin.readline())
topics = sys.stdin.readline()
topicTree = parseTopics(topics)
htable = hashTree(topicTree)

prefixTree = TrieNode(None)
numQuestions = int(sys.stdin.readline())
leafNodes = []
for i in range(numQuestions):
    topic, question = sys.stdin.readline().split(": ")
    matchingTopics = getMatchingTopics(topic, htable)
    addTrieNode(prefixTree, question, matchingTopics)
    #print('done')

sys.exit(0)

numQueries = int(sys.stdin.readline())
for i in range(numQueries):
    topic, query = sys.stdin.readline().strip().split(" ", 1)
    matchingTopics = getMatchingTopics(topic, htable)
    print(getPrefixMatchesCount(prefixTree, query, matchingTopics))
