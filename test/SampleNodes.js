var SampleNodes = {};


SampleNodes.SampleHiearchy_HierNode = function(HierNodeLib)
{
	var root = HierNodeLib.HierNode(
	{
		Text: "A1"
	});
	var node = null;
	root.AddChild(
	{
		Text: "B1"
	});
	node = root.Child(0);
	node.AddChild(
	{
		Text: "C1"
	});
	node.Child(0).AddChild(
	{
		Text: "D1"
	});
	node.Child(0).AddChild(
	{
		Text: "D2"
	});
	node.Child(0).AddChild(
	{
		Text: "D3"
	});
	node.AddChild(
	{
		Text: "C2"
	});
	node.AddChild(
	{
		Text: "C3"
	});
	node = root.AddChild(
	{
		Text: "B2"
	});
	node.AddChild(
	{
		Text: "C4"
	});
	node.AddChild(
	{
		Text: "C5"
	});
	node.AddChild(
	{
		Text: "C6"
	});
	node = root.AddChild(
	{
		Text: "B3"
	});
	node.AddChild(
	{
		Text: "C7"
	});
	return root;
}


SampleNodes.SampleHiearchy_TextNode = function(HierNodeLib)
{
	var root = HierNodeLib.TextNode("A1");
	var node = null;
	root.AddChild(HierNodeLib.TextNode("B1"));
	node = root.Child(0);
	node.AddChild(HierNodeLib.TextNode("C1"));
	node.Child(0).AddChild(HierNodeLib.TextNode("D1"));
	node.Child(0).AddChild(HierNodeLib.TextNode("D2"));
	node.Child(0).AddChild(HierNodeLib.TextNode("D3"));
	node.AddChild(HierNodeLib.TextNode("C2"));
	node.AddChild(HierNodeLib.TextNode("C3"));
	node = root.AddChild(HierNodeLib.TextNode("B2"));
	node.AddChild(HierNodeLib.TextNode("C4"));
	node.AddChild(HierNodeLib.TextNode("C5"));
	node.AddChild(HierNodeLib.TextNode("C6"));
	node = root.AddChild(HierNodeLib.TextNode("B3"));
	node.AddChild(HierNodeLib.TextNode("C7"));
	return root;
};


SampleNodes.ThreeLevelOutline = function(HierNodeLib, LevelOneChildren, LevelTwoChildren, LevelThreeChildren)
{
	var root = HierNodeLib.TextNode("Root");
	for (var parent_index = 1; parent_index <= LevelOneChildren; parent_index++)
	{
		var parent = root.AddChild(HierNodeLib.TextNode(parent_index));
		for (var child_index = 1; child_index <= LevelTwoChildren; child_index++)
		{
			var child = parent.AddChild(HierNodeLib.TextNode(parent_index + "." + child_index));
			for (var grand_child_index = 1; grand_child_index <= LevelThreeChildren; grand_child_index++)
			{
				child.AddChild(HierNodeLib.TextNode(parent_index + "." + child_index + "." + grand_child_index));
			}
		}
	}
	return root;
};


//==========================================
// Integrate with the browser environment.
if (typeof window != 'undefined') window['SampleNodes'] = SampleNodes;


//==========================================
// Integrate with the nodejs environment.
if (typeof exports != 'undefined') exports.SampleNodes = SampleNodes;
