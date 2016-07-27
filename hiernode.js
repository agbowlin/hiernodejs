//=====================================================================
//=====================================================================
//          ___  __        __   __   ___       __  
//  |__| | |__  |__) |\ | /  \ |  \ |__     | /__` 
//  |  | | |___ |  \ | \| \__/ |__/ |___ \__/ .__/ 
//                                                 
//=====================================================================
//=====================================================================
//	Version: v0.1.11
//=====================================================================


var HierNodeLib = (function()
{


	//=====================================================================
	//=====================================================================
	//   __        __   ___          __   __   ___ 
	//  |__)  /\  /__` |__     |\ | /  \ |  \ |__  
	//  |__) /~~\ .__/ |___    | \| \__/ |__/ |___ 
	//                                             
	//=====================================================================
	//=====================================================================


	//==========================================
	function InitNode(ThisNode, ThisPrevNode = null, ThisNextNode = null, ThisIndent = 0)
	{
		ThisNode._hnPrevNode = ThisPrevNode;
		ThisNode._hnNextNode = ThisNextNode;
		ThisNode._hnIndent = ThisIndent;
		return ThisNode;
	}


	//==========================================
	function PrevNode(ThisNode)
	{
		return ThisNode._hnPrevNode;
	}

	function NextNode(ThisNode)
	{
		return ThisNode._hnNextNode;
	}

	function Indent(ThisNode)
	{
		return ThisNode._hnIndent;
	}


	//=====================================================================
	//=====================================================================
	//                    __       ___    __       
	//  |\ |  /\  \  / | / _`  /\   |  | /  \ |\ | 
	//  | \| /~~\  \/  | \__> /~~\  |  | \__/ | \| 
	//                                             
	//=====================================================================
	//=====================================================================


	// D3 = C2.Prev        A1
	// C3 = C2.Next         +- B1
	// A1 = C1.First        |   +- C1
	// C7 = C1.Last         |   |   +- D1
	// A1 = C1.Root         |   |   +- D2
	// B1 = C1.Parent       |   |   +- D3
	// C1 = C2.PrevSib      |   +- C2
	// C2 = C1.NextSib      |   +- C3
	// C1 = C1.FirstSib     +- B2
	// C3 = C1.LastSib      |   +- C4
	// B1 = A1.FirstChild   |   +- C5
	// B3 = A1.LastChild    |   +- C6
	// B1 = A1.FirstDesc    +- B3
	// C7 = A1.LastDesc         +- C7


	//==========================================
	// Enumeration for Node Relationship Types
	var RelationshipTypes = {
		PrevNode: 'PrevNode',
		NextNode: 'NextNode',
		FirstNode: 'FirstNode',
		LastNode: 'LastNode',
		RootNode: 'RootNode',
		ParentNode: 'ParentNode',
		PrevSibNode: 'PrevSibNode',
		NextSibNode: 'NextSibNode',
		FirstSibNode: 'FirstSibNode',
		LastSibNode: 'LastSibNode',
		FirstChildNode: 'FirstChildNode',
		LastChildNode: 'LastChildNode',
		FirstDescNode: 'FirstDescNode',
		LastDescNode: 'LastDescNode'
	};


	//==========================================
	function FindRelative(ThisNode, RelationshipType)
	{
		var node_prev = ThisNode._hnPrevNode;
		var node_next = ThisNode._hnNextNode;
		var node_root = ThisNode;
		var node_sib = ThisNode;
		var node_child = null;
		while (true)
		{
			if (RelationshipType === RelationshipTypes.PrevNode)
			{
				return ThisNode._hnPrevNode;
			}
			else if (RelationshipType === RelationshipTypes.NextNode)
			{
				return ThisNode._hnNextNode;
			}
			else if (RelationshipType === RelationshipTypes.FirstNode)
			{
				if (node_prev === null)
				{
					return ThisNode;
				}
				if (node_prev._hnPrevNode === null)
				{
					return node_prev;
				}
				node_prev = node_prev._hnPrevNode;
			}
			else if (RelationshipType === RelationshipTypes.LastNode)
			{
				if (node_next === null)
				{
					return ThisNode;
				}
				if (node_next._hnNextNode === null)
				{
					return node_next;
				}
				node_next = node_next._hnNextNode;
			}
			else if (RelationshipType === RelationshipTypes.RootNode)
			{
				if (node_prev === null)
				{
					return node_root;
				}
				if (node_prev._hnIndent < node_root._hnIndent)
				{
					node_root = node_prev;
				}
				node_prev = node_prev._hnPrevNode;
			}
			else if (RelationshipType === RelationshipTypes.ParentNode)
			{
				if (node_prev === null)
				{
					break;
				}
				if (node_prev._hnIndent < ThisNode._hnIndent)
				{
					return node_prev;
				}
				node_prev = node_prev._hnPrevNode;
			}
			else if (RelationshipType === RelationshipTypes.PrevSibNode)
			{
				if (node_prev === null)
				{
					break;
				}
				if (node_prev._hnIndent < ThisNode._hnIndent)
				{
					break;
				}
				if (node_prev._hnIndent === ThisNode._hnIndent)
				{
					return node_prev;
				}
				node_prev = node_prev._hnPrevNode;
			}
			else if (RelationshipType === RelationshipTypes.NextSibNode)
			{
				if (node_next === null)
				{
					break;
				}
				if (node_next._hnIndent < ThisNode._hnIndent)
				{
					break;
				}
				if (node_next._hnIndent === ThisNode._hnIndent)
				{
					return node_next;
				}
				node_next = node_next._hnNextNode;
			}
			else if (RelationshipType === RelationshipTypes.FirstSibNode)
			{
				if (node_prev === null)
				{
					return node_sib;
				}
				if (node_prev._hnIndent < ThisNode._hnIndent)
				{
					return node_sib;
				}
				if (node_prev._hnIndent === ThisNode._hnIndent)
				{
					node_sib = node_prev;
				}
				node_prev = node_prev._hnPrevNode;
			}
			else if ((RelationshipType === RelationshipTypes.LastSibNode))
			{
				if (node_next === null)
				{
					return node_sib;
				}
				if (node_next._hnIndent < ThisNode._hnIndent)
				{
					return node_sib;
				}
				if (node_next._hnIndent === ThisNode._hnIndent)
				{
					node_sib = node_next;
				}
				node_next = node_next._hnNextNode;
			}
			else if ((RelationshipType === RelationshipTypes.FirstChildNode))
			{
				if (node_next === null)
				{
					break;
				}
				if (node_next._hnIndent <= ThisNode._hnIndent)
				{
					break;
				}
				if (node_next._hnIndent === (ThisNode._hnIndent + 1))
				{
					return node_next;
				}
				node_next = node_next._hnNextNode;
			}
			else if (RelationshipType === RelationshipTypes.LastChildNode)
			{
				if (node_next === null)
				{
					return node_child;
				}
				if (node_next._hnIndent <= ThisNode._hnIndent)
				{
					return node_child;
				}
				if (node_next._hnIndent === (ThisNode._hnIndent + 1))
				{
					node_child = node_next;
				}
				node_next = node_next._hnNextNode;
			}
			else if (RelationshipType === RelationshipTypes.FirstDescNode)
			{
				if (node_next)
				{
					if (node_next._hnIndent > ThisNode._hnIndent)
					{
						return node_next;
					}
				}
				break;
			}
			else if (RelationshipType === RelationshipTypes.LastDescNode)
			{
				if (node_next === null)
				{
					return node_child;
				}
				if (node_next._hnIndent <= ThisNode._hnIndent)
				{
					return node_child;
				}
				if (node_next._hnIndent > ThisNode._hnIndent)
				{
					node_child = node_next;
				}
				node_next = node_next._hnNextNode;
			}
			else
			{
				break;
			}
		}
		return null;
	}


	//==========================================
	function FindChild(ThisNode, ChildIndex)
	{
		if (ChildIndex < 0)
		{
			return null;
		}
		var child = FindRelative(ThisNode, RelationshipTypes.FirstChildNode);
		while (child)
		{
			if (ChildIndex === 0)
			{
				// This is the child we are looking for.
				return child;
			}
			ChildIndex--;
			child = FindRelative(child, RelationshipTypes.NextSibNode);
		}
		return null;
	}


	//=====================================================================
	//=====================================================================
	//          __    ___      ___    __       
	//  \  / | /__` |  |   /\   |  | /  \ |\ | 
	//   \/  | .__/ |  |  /~~\  |  | \__/ | \| 
	//                                         
	//=====================================================================
	//=====================================================================


	//==========================================
	/** @constructor */
	function NullVisitor()
	{
		this.Visit = function(Node)
		{
			return true;
		};
	}


	//==========================================
	/** @constructor */
	function CountingVisitor()
	{
		this.Count = 0;
		this.Visit = function(Node)
		{
			this.Count++;
			return true;
		};
	}


	//==========================================
	/** @constructor */
	function CollectingVisitor()
	{
		this.Nodes = [];
		this.Visit = function(Node)
		{
			this.Nodes.push(Node);
			return true;
		};
	}


	//==========================================
	/** @constructor */
	function PropertySearchVisitor(PropertyName, PropertyValue)
	{
		this.PropertyName = PropertyName;
		this.PropertyValue = PropertyValue;
		this.Nodes = [];
		this.Visit = function(Node)
		{
			if (Node[PropertyName] === PropertyValue)
			{
				this.Nodes.push(Node);
			}
			return true;
		};
	}


	//==========================================
	/** @constructor */
	function PropertySearchFirstVisitor(PropertyName, PropertyValue)
	{
		this.PropertyName = PropertyName;
		this.PropertyValue = PropertyValue;
		this.Node = null;
		this.Visit = function(Node)
		{
			if (Node[PropertyName] === PropertyValue)
			{
				this.Node = Node;
				return false;
			}
			return true;
		};
	}


	//==========================================
	function VisitPrevious(ThisNode, NodeVisitor)
	{
		var node = FindRelative(ThisNode, RelationshipTypes.PrevNode);
		while (node)
		{
			if (!NodeVisitor.Visit(node))
			{
				break;
			}
			node = FindRelative(node, RelationshipTypes.PrevNode);
		}
		return NodeVisitor;
	}


	//==========================================
	function VisitNext(ThisNode, NodeVisitor)
	{
		var node = FindRelative(ThisNode, RelationshipTypes.NextNode);
		while (node)
		{
			if (!NodeVisitor.Visit(node))
			{
				break;
			}
			node = FindRelative(node, RelationshipTypes.NextNode);
		}
		return NodeVisitor;
	}


	//==========================================
	function VisitParents(ThisNode, NodeVisitor)
	{
		var node = FindRelative(ThisNode, RelationshipTypes.ParentNode);
		while (node)
		{
			if (!NodeVisitor.Visit(node))
			{
				break;
			}
			node = FindRelative(node, RelationshipTypes.ParentNode);
		}
		return NodeVisitor;
	}


	//==========================================
	function VisitPreviousSiblings(ThisNode, NodeVisitor)
	{
		var node = FindRelative(ThisNode, RelationshipTypes.PrevSibNode);
		while (node)
		{
			if (!NodeVisitor.Visit(node))
			{
				break;
			}
			node = FindRelative(node, RelationshipTypes.PrevSibNode);
		}
		return NodeVisitor;
	}


	//==========================================
	function VisitNextSiblings(ThisNode, NodeVisitor)
	{
		var node = FindRelative(ThisNode, RelationshipTypes.NextSibNode);
		while (node)
		{
			if (!NodeVisitor.Visit(node))
			{
				break;
			}
			node = FindRelative(node, RelationshipTypes.NextSibNode);
		}
		return NodeVisitor;
	}


	//==========================================
	function VisitChildren(ThisNode, NodeVisitor)
	{
		var node = FindRelative(ThisNode, RelationshipTypes.FirstChildNode);
		while (node)
		{
			if (!NodeVisitor.Visit(node))
			{
				break;
			}
			node = FindRelative(node, RelationshipTypes.NextSibNode);
		}
		return NodeVisitor;
	}


	//==========================================
	function ChildCount(ThisNode)
	{
		// var counter = new CountingVisitor();
		// this.VisitChildren(counter);
		// return counter.Count;
		return VisitChildren(ThisNode, new CountingVisitor()).Count;
	}


	//==========================================
	function Children(ThisNode)
	{
		return VisitChildren(ThisNode, new CollectingVisitor()).Nodes;
	}


	//==========================================
	function VisitDescendentsDepthFirst(ThisNode, NodeVisitor)
	{
		var node = FindRelative(ThisNode, RelationshipTypes.FirstChildNode);
		while (node)
		{
			if (node._hnIndent <= ThisNode._hnIndent)
			{
				break;
			}
			if (!NodeVisitor.Visit(node))
			{
				break;
			}
			node = FindRelative(node, RelationshipTypes.NextNode);
		}
		return NodeVisitor;
	}


	//==========================================
	function VisitDescendentsBreadthFirst(ThisNode, NodeVisitor)
	{
		throw new Error("Not implemented.");
		// return NodeVisitor;
	}


	//==========================================
	function DescendentCount(ThisNode)
	{
		return VisitDescendentsDepthFirst(ThisNode, new CountingVisitor()).Count;
	}


	//==========================================
	function Descendents(ThisNode)
	{
		return VisitDescendentsDepthFirst(ThisNode, new CollectingVisitor()).Nodes;
	}


	//=====================================================================
	//=====================================================================
	//                    ___  ___                 __   ___ 
	//   |\/|  /\  | |\ |  |  |__  |\ |  /\  |\ | /  ` |__  
	//   |  | /~~\ | | \|  |  |___ | \| /~~\ | \| \__, |___ 
	//                                                      
	//=====================================================================
	//=====================================================================


	//==========================================
	function Link(ThisNode, PrevNode, NextNode)
	{
		if (ThisNode._hnPrevNode || ThisNode._hnNextNode)
		{
			throw new Error("This node is already linked.");
		}
		ThisNode._hnPrevNode = PrevNode;
		ThisNode._hnNextNode = NextNode;
		if (ThisNode._hnPrevNode)
		{
			ThisNode._hnPrevNode._hnNextNode = ThisNode;
		}
		if (ThisNode._hnNextNode)
		{
			ThisNode._hnNextNode._hnPrevNode = ThisNode;
		}
		return ThisNode;
	}


	//==========================================
	function Unlink(ThisNode)
	{
		var prev_node = ThisNode._hnPrevNode;
		var next_node = ThisNode._hnNextNode;
		ThisNode._hnPrevNode = null;
		ThisNode._hnNextNode = null;
		if (prev_node)
		{
			prev_node._hnNextNode = next_node;
		}
		if (next_node)
		{
			next_node._hnPrevNode = prev_node;
		}
		return ThisNode;
	}


	//==========================================
	function AddChild(ThisNode, ChildNode = {}, ChildIndex = -1)
	{
		ChildNode = HierNode(ChildNode);

		var prev_node = ThisNode;
		var next_node = ThisNode._hnNextNode;
		while (next_node)
		{
			if (next_node._hnIndent === (ThisNode._hnIndent + 1))
			{
				// A direct child was found.
				if (ChildIndex === 0)
				{
					// This is the child we are looking for. Insert.
					ChildNode._hnIndent = ThisNode._hnIndent + 1;
					ChildNode.Link(prev_node, next_node);
					return ChildNode;
				}
				ChildIndex--;
			}
			else if (next_node._hnIndent <= ThisNode._hnIndent)
			{
				// No more child nodes. Append.
				ChildNode._hnIndent = ThisNode._hnIndent + 1;
				ChildNode.Link(prev_node, next_node);
				return ChildNode;
			}
			prev_node = next_node;
			next_node = next_node._hnNextNode;
		}

		// No more nodes. Append.
		ChildNode._hnIndent = ThisNode._hnIndent + 1;
		ChildNode.Link(prev_node, null);
		return ChildNode;
	}



	//==========================================
	function RemoveChild(ThisNode, ChildIndex)
	{
		var child = FindChild(ThisNode, ChildIndex);
		if (child)
		{
			Unlink(child);
		}
		return child;
	}


	//==========================================
	function ClearChildren(ThisNode)
	{
		var children = [];
		var child = RemoveChild(ThisNode, 0);
		while (child)
		{
			children.push(child);
			child = RemoveChild(ThisNode, 0);
		}
		return children;
	}


	//=====================================================================
	//=====================================================================
	//           __   __   ___                      ___  __        __  
	//   |\/| | /__` /  ` |__  |    |     /\  |\ | |__  /  \ |  | /__` 
	//   |  | | .__/ \__, |___ |___ |___ /~~\ | \| |___ \__/ \__/ .__/ 
	//                                                                 
	//=====================================================================
	//=====================================================================


	//==========================================
	function TextGraph(RootNode, TextProperty, IndentText = '\t', EolText = '\n')
	{
		var text_graph = RootNode[TextProperty];
		var next_node = RootNode._hnNextNode;
		while (true)
		{
			if (!next_node)
			{
				break;
			}
			if (next_node._hnIndent <= RootNode._hnIndent)
			{
				break;
			}
			text_graph += EolText;
			for (var index = 1; index <= (next_node._hnIndent - RootNode._hnIndent); index++)
			{
				text_graph += IndentText;
			}
			text_graph += next_node[TextProperty];
			next_node = next_node._hnNextNode;
		}
		return text_graph;
	}


	//=====================================================================
	//=====================================================================
	//          __   __        __               __    
	//  |    | |__) |__)  /\  |__) \ /     /\  |__) | 
	//  |___ | |__) |  \ /~~\ |  \  |     /~~\ |    | 
	//                                                
	//=====================================================================
	//=====================================================================


	var Lib = {};

	// Base Node
	Lib.InitNode = InitNode;
	Lib.PrevNode = PrevNode;
	Lib.NextNode = NextNode;
	Lib.Indent = Indent;

	// Navigation
	Lib.RelationshipTypes = RelationshipTypes;
	Lib.FindRelative = FindRelative;
	Lib.FindChild = FindChild;

	// Visitation
	Lib.NullVisitor = NullVisitor;
	Lib.CountingVisitor = CountingVisitor;
	Lib.CollectingVisitor = CollectingVisitor;
	Lib.PropertySearchVisitor = PropertySearchVisitor;
	Lib.PropertySearchFirstVisitor = PropertySearchFirstVisitor;
	Lib.VisitPrevious = VisitPrevious;
	Lib.VisitNext = VisitNext;
	Lib.VisitParents = VisitParents;
	Lib.VisitPreviousSiblings = VisitPreviousSiblings;
	Lib.VisitNextSiblings = VisitNextSiblings;
	Lib.VisitChildren = VisitChildren;
	Lib.ChildCount = ChildCount;
	Lib.Children = Children;
	Lib.VisitDescendentsDepthFirst = VisitDescendentsDepthFirst;
	Lib.VisitDescendentsBreadthFirst = VisitDescendentsBreadthFirst;
	Lib.DescendentCount = DescendentCount;
	Lib.Descendents = Descendents;

	// Maintenance
	Lib.Link = Link;
	Lib.Unlink = Unlink;
	Lib.AddChild = AddChild;
	Lib.RemoveChild = RemoveChild;
	Lib.ClearChildren = ClearChildren;

	// Miscellaneous
	Lib.TextGraph = TextGraph;

	return Lib;
}());


//=====================================================================
//=====================================================================
//          ___  __        __   __   ___     __   __        ___  __  ___ 
//  |__| | |__  |__) |\ | /  \ |  \ |__     /  \ |__)    | |__  /  `  |  
//  |  | | |___ |  \ | \| \__/ |__/ |___    \__/ |__) \__/ |___ \__,  |  
//                                                                       
//=====================================================================
//=====================================================================


//==========================================
// The HierNode Attacher.
// An object oriented wrapper for HierNodeLib.
function HierNode(ThisNode = {})
{
	//------------------------------------------
	// Base Node
	//------------------------------------------

	HierNodeLib.InitNode(ThisNode);

	ThisNode.PrevNode = function()
	{
		return HierNodeLib.PrevNode(this);
	};

	ThisNode.NextNode = function()
	{
		return HierNodeLib.NextNode(this);
	};

	ThisNode.Indent = function()
	{
		return HierNodeLib.Indent(this);
	};

	//------------------------------------------
	// Navigation
	//------------------------------------------

	ThisNode.FindRelative = function(RelationshipType)
	{
		return HierNodeLib.FindRelative(this, RelationshipType);
	};

	ThisNode.FindFirst = function()
	{
		return HierNodeLib.FindRelative(this, HierNodeLib.RelationshipTypes.FirstNode);
	};

	ThisNode.FindLast = function()
	{
		return HierNodeLib.FindRelative(this, HierNodeLib.RelationshipTypes.LastNode);
	};

	ThisNode.FindRoot = function()
	{
		return HierNodeLib.FindRelative(this, HierNodeLib.RelationshipTypes.RootNode);
	};

	ThisNode.FindParent = function()
	{
		return HierNodeLib.FindRelative(this, HierNodeLib.RelationshipTypes.ParentNode);
	};

	ThisNode.FindPrevSibling = function()
	{
		return HierNodeLib.FindRelative(this, HierNodeLib.RelationshipTypes.PrevSibNode);
	};

	ThisNode.FindNextSibling = function()
	{
		return HierNodeLib.FindRelative(this, HierNodeLib.RelationshipTypes.NextSibNode);
	};

	ThisNode.FindFirstSibling = function()
	{
		return HierNodeLib.FindRelative(this, HierNodeLib.RelationshipTypes.FirstSibNode);
	};

	ThisNode.FindLastSibling = function()
	{
		return HierNodeLib.FindRelative(this, HierNodeLib.RelationshipTypes.LastSibNode);
	};

	ThisNode.FindFirstChild = function()
	{
		return HierNodeLib.FindRelative(this, HierNodeLib.RelationshipTypes.FirstChildNode);
	};

	ThisNode.FindLastChild = function()
	{
		return HierNodeLib.FindRelative(this, HierNodeLib.RelationshipTypes.LastChildNode);
	};

	ThisNode.FindFirstDescendent = function()
	{
		return HierNodeLib.FindRelative(this, HierNodeLib.RelationshipTypes.FirstDescNode);
	};

	ThisNode.FindLastDescendent = function()
	{
		return HierNodeLib.FindRelative(this, HierNodeLib.RelationshipTypes.LastDescNode);
	};

	ThisNode.FindChild = function(ChildIndex)
	{
		return HierNodeLib.FindChild(this, ChildIndex);
	};

	//------------------------------------------
	// Visitation
	//------------------------------------------

	ThisNode.VisitPrevious = function(NodeVisitor)
	{
		return HierNodeLib.VisitPrevious(this, NodeVisitor);
	};

	ThisNode.VisitNext = function(NodeVisitor)
	{
		return HierNodeLib.VisitNext(this, NodeVisitor);
	};

	ThisNode.VisitParents = function(NodeVisitor)
	{
		return HierNodeLib.VisitParents(this, NodeVisitor);
	};

	ThisNode.VisitPreviousSiblings = function(NodeVisitor)
	{
		return HierNodeLib.VisitPreviousSiblings(this, NodeVisitor);
	};

	ThisNode.VisitNextSiblings = function(NodeVisitor)
	{
		return HierNodeLib.VisitNextSiblings(this, NodeVisitor);
	};

	ThisNode.VisitChildren = function(NodeVisitor)
	{
		return HierNodeLib.VisitChildren(this, NodeVisitor);
	};

	ThisNode.ChildCount = function()
	{
		return HierNodeLib.ChildCount(this);
	};

	ThisNode.Children = function()
	{
		return HierNodeLib.Children(this);
	};

	ThisNode.SearchChildren = function(PropertyName, PropertyValue)
	{
		return HierNodeLib.VisitChildren(this, new HierNodeLib.PropertySearchVisitor(PropertyName, PropertyValue)).Nodes;
	};

	ThisNode.VisitDescendentsDepthFirst = function(NodeVisitor)
	{
		return HierNodeLib.VisitDescendentsDepthFirst(this, NodeVisitor);
	};

	ThisNode.VisitDescendentsBreadthFirst = function(NodeVisitor)
	{
		return HierNodeLib.VisitDescendentsBreadthFirst(this, NodeVisitor);
	};

	ThisNode.DescendentCount = function()
	{
		return HierNodeLib.DescendentCount(this);
	};

	ThisNode.Descendents = function()
	{
		return HierNodeLib.Descendents(this);
	};

	ThisNode.SearchDescendents = function(PropertyName, PropertyValue)
	{
		return HierNodeLib.VisitDescendentsDepthFirst(this, new HierNodeLib.PropertySearchVisitor(PropertyName, PropertyValue)).Nodes;
	};

	//------------------------------------------
	// Maintenance
	//------------------------------------------

	ThisNode.Link = function(PrevNode, NextNode)
	{
		return HierNodeLib.Link(this, PrevNode, NextNode);
	};

	ThisNode.Unlink = function()
	{
		return HierNodeLib.Unlink(this);
	};

	ThisNode.AddChild = function(Node = null, ChildIndex = -1)
	{
		return HierNodeLib.AddChild(this, Node, ChildIndex);
	};

	ThisNode.RemoveChild = function(ChildIndex)
	{
		return HierNodeLib.RemoveChild(this, ChildIndex);
	};

	ThisNode.ClearChildren = function()
	{
		return HierNodeLib.ClearChildren(this);
	};

	//------------------------------------------
	// Miscellaneous
	//------------------------------------------

	ThisNode.TextGraph = function(TextProperty, IndentText = '\t', EolText = '\n')
	{
		return HierNodeLib.TextGraph(this, TextProperty, IndentText, EolText);
	};

	//------------------------------------------
	// Return the Node.

	return ThisNode;
}


//==========================================
// The HierNode Attacher.
// An object oriented wrapper for HierNodeLib.
function TextNode(ThisText = "")
{
	var node = HierNode(
	{
		Text: ThisText
	});

	node.AddChildText = function(ThisText = "", ChildIndex = -1)
	{
		return HierNodeLib.AddChild(this, TextNode(ThisText), ChildIndex);
	};

	return node;
}


//=====================================================================
//=====================================================================
//         ___  ___  __   __       ___    __       
//  | |\ |  |  |__  / _` |__)  /\   |  | /  \ |\ | 
//  | | \|  |  |___ \__> |  \ /~~\  |  | \__/ | \| 
//                                                 
//=====================================================================
//=====================================================================


//==========================================
// Export public objects for the Closure Compiler.
// see: https://developers.google.com/closure/compiler/docs/api-tutorial3
if (window)
{
	window['HierNodeLib'] = HierNodeLib;
	window['HierNode'] = HierNode;
	window['TextNode'] = TextNode;
}
