var HierNodeLib = require('../hiernode.js').HierNodeLib;
var SampleNodes = require('./SampleNodes.js').SampleNodes;


function Test(TestCase, Description)
{
	var status = TestCase ? 'pass' : 'fail';
	console.log(status + ': ' + Description);
	return;
}


// Get some nodes.

var node = SampleNodes.ThreeLevelOutline(HierNodeLib, 3, 3, 3);
var text_graph = node.TextGraph("Text", false, "|- ", "\n");
console.log(text_graph);

// Do some reporting.

Test(node.ChildCount() === 3, "A: Root has 3 children.");
Test(node.DescendentCount() === 39, "A: Root has 39 descendents.");

// Remove some children.

node = node.SearchFirstDescendent("Text", "2.3");
Test(node.Text == "2.3", "A: Found descendent node 2.3.");

node.RemoveChildren();
Test(node.ChildCount() == 0, "B: Removed all children from 2.3.");

node = node.FindRoot();
Test(node.Text == "Root", "B: Found root from 2.3.");

text_graph = node.TextGraph("Text", false, "|- ", "\n");
console.log(text_graph);

Test(node.DescendentCount() === 36, "B: Root now has 36 descendents.");

// Remove some more children.

node = node.SearchFirstDescendent("Text", "3");
Test(node.Text == "3", "B: Found descendent node 3.");

node.RemoveChildren();
Test(node.ChildCount() == 0, "C: Removed all children from 3.");

node = node.FindRoot();
Test(node.Text == "Root", "C: Found root from 3.");

text_graph = node.TextGraph("Text", false, "|- ", "\n");
console.log(text_graph);

Test(node.DescendentCount() === 24, "C: Root now has 24 descendents.");

// Exit.

process.exit(0);
