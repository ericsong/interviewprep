import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

class Node {
    public String topic;
    public ArrayList<String> questions;
    public Node parent;
    public ArrayList<Node> children;

    public Node(String topic, Node parent) {
        this.topic = topic;
        this.parent = parent;
        this.questions = new ArrayList<String>();
        this.children = new ArrayList<Node>();    
    }

    public static Node parseTopics(String rawStr) {
        String[] terms = rawStr.trim().split(" ");
    
        Node root = new Node(terms[0], null);
        Node insertParent = root;
        ArrayList<Node> insertLocation = root.children;

        for(int i = 2; i < terms.length; i++) {
            String term = terms[i];

            if( term.equals("(") ) {
                insertParent = insertLocation.get(insertLocation.size() - 1);
                insertLocation = insertParent.children;
            } else if( term.equals(")") ) {
                insertParent = insertParent.parent;

                if(insertParent == null) {
                    return root;
                } else {
                    insertLocation = insertParent.children;
                }
            } else {
                Node newNode = new Node(term, insertParent);

                insertLocation.add(newNode);
            }
        }

        return null;
    }

    public Hashtable<String, Node> hashTree() {
        Hashtable<String, Node> table = new Hashtable<String, Node>();
        
        Stack<Node> stack = new Stack<Node>();
        stack.push(this);

        while(!stack.empty()) {
            Node cur = stack.pop();
            stack.addAll(cur.children);

            table.put(cur.topic, cur);
        }

        return table;
    }

    public void sortTree() {
        Stack<Node> stack = new Stack<Node>();
        stack.push(this);

        while(!stack.empty()) {
            Node cur = stack.pop();
            stack.addAll(cur.children);

            Collections.sort(cur.questions);
        }
    }

    private static int binSearchStrPrefix(ArrayList<String> arr, String pre) {
        int imin = 0;
        int imax = arr.size() - 1;

        while( imin <= imax ) {
            int imid = (imin + imax) / 2;

            if( arr.get(imid).startsWith(pre) ) {
                return imid;
            } else if(pre.compareTo(arr.get(imid)) < 0) {
                imax = imid - 1;
            } else {
                imin = imid + 1;
            }
        }

        return -1;
    }

    private static int getMatchesInArray(ArrayList<String> arr, String query) {
        int matchCount = 0;
        int matchIndex = binSearchStrPrefix(arr, query);

        if( matchIndex == -1 ) {
            return 0;
        }

        // scan right of matchIndex
        int scanIndex = matchIndex;
        while( scanIndex < arr.size() && arr.get(scanIndex).startsWith(query)) {
            matchCount++;
            scanIndex++;
        }

        // scan left of matchIndex
        scanIndex = matchIndex - 1;
        while( scanIndex >= 0 && arr.get(scanIndex).startsWith(query) ) {
            matchCount++;
            scanIndex--;
        }

        return matchCount;
    }

    public int getMatches(String query) {
        int matchCount = 0;

        Stack<Node> stack = new Stack<Node>();
        stack.push(this);

        while(!stack.empty()) {
            Node cur = stack.pop();
            stack.addAll(cur.children);

            matchCount += getMatchesInArray(cur.questions, query);
        }

        return matchCount;
    }
}

public class Solution {
    public static void main(String[] args) {
        Scanner reader = new Scanner(System.in);
        
        int numTopics = Integer.parseInt(reader.nextLine());
        String topicsStr = reader.nextLine();
        int numQuestions = Integer.parseInt(reader.nextLine());

        Node topicsTree = Node.parseTopics(topicsStr);
        Hashtable<String, Node> table = topicsTree.hashTree();

        for(int i = 0; i < numQuestions; i++) {
            String line = reader.nextLine().trim();
            String topic = line.split(": ")[0];
            String question = line.split(": ")[1];

            table.get(topic).questions.add(question);
        }

        topicsTree.sortTree();

        int numQueries = Integer.parseInt(reader.nextLine());
        for(int i = 0; i < numQueries; i++) {
            String line = reader.nextLine().trim();
            String topic = line.split(" ", 2)[0];
            String query = line.split(" ", 2)[1];

            Node node = table.get(topic);
            System.out.println(node.getMatches(query));
           
        }
    }
}
