from datetime import datetime
import sys
import math

tstart = datetime.now()

class Node(object):
    def __init__(self):
        self.topic = None
        self.questions = []
        self.parent = None
        self.children = []

class PrefixNode(object):
    def __init__(self, c):
        self.char = c
        self.children = {}
        self.topics = {}

def parseTopics(topicRawStr):
    """ parse topics string and return tree """

    terms = topicRawStr.strip().split(' ')
    root = Node()
    root.topic = terms[0]

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
            newNode.topic = term
            newNode.parent = insertParent

            insertLocation.append(newNode)

def getMatchingTopics(topic, topicsTable):
    """ returns all matching topics for a given topic (the topic's subtree)"""
    
    topics = []
    stack = [topicsTable[topic]]

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

def addPrefixNode(node, text, topic):
    """ adds an entry to the prefix tree. adds a tally  at each node visited/added """

    for c in text:
        if c in node.children:
            node = node.children[c]

            if topic in node.topics:
                node.topics[topic] = node.topics[topic] + 1
            else:
                node.topics[topic] = 1
        else:
            node.children[c] = PrefixNode(c)
            node = node.children[c]

            if topic in node.topics:
                node.topics[topic] = node.topics[topic] + 1
            else:
                node.topics[topic] = 1

def getPrefixMatchesCount(node, query, topics):
    """ Gets number of matches for a given query and topic. Adds up counts for matching topics in prefix tree """

    matchCount = 0
   
    for c in query:
        if c in node.children:
            node = node.children[c]
        else:
            return 0

    for topic in topics:
        count = node.topics.get(topic)
        if count:
            matchCount = matchCount + count

    return matchCount

numTopics = int(sys.stdin.readline())
topics = sys.stdin.readline()
topicTree = parseTopics(topics)
htable = hashTree(topicTree)

prefixTree = PrefixNode(None)
numQuestions = int(sys.stdin.readline())
for i in range(numQuestions):
    topic, question = sys.stdin.readline().split(": ")
    addPrefixNode(prefixTree, question, topic)

numQueries = int(sys.stdin.readline())
for i in range(numQueries):
    topic, query = sys.stdin.readline().strip().split(" ", 1)
    matchingTopics = getMatchingTopics(topic, htable)
    print(getPrefixMatchesCount(prefixTree, query, matchingTopics))
