//=====================================================================
//=====================================================================
//   _ _  _            _ _         _        _  ___ 
//  | | |<_> ___  _ _ | \ | ___  _| | ___  | |/ __>
//  |   || |/ ._>| '_>|   |/ . \/ . |/ ._>_| |\__ \
//  |_|_||_|\___.|_|  |_\_|\___/\___|\___.\__/<___/
//                                                 
//=====================================================================
//=====================================================================
//	Version: v0.1.12
//=====================================================================

//=====================================================================
/**
 * HierNodeLib Module
 * @namespace HierNodeLib
 */
var HierNodeLib = (function()
{
	return {

		//==========================================
		/**
		 * @interface HierNode
		 * @memberof HierNodeLib
		 * 
		 * @summary
		 * Attaches a number functions used to construct and maintain
		 * a hierarchy of objects.
		 */
		HierNode: function(ThisNode = {})
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
			/**
			 * @member {Object} _hnPrevNode
			 * @memberof HierNodeLib.HierNode
			 */
			ThisNode._hnPrevNode = null;
			
			//==========================================
			/**
			 * @member {Object} _hnNextNode
			 * @memberof HierNodeLib.HierNode
			 */
			ThisNode._hnNextNode = null;
			
			//==========================================
			/**
			 * @member {number} _hnIndent
			 * @memberof HierNodeLib.HierNode
			 */
			ThisNode._hnIndent = 0;


			//==========================================
			/**
			 * @function PrevNode
			 * @memberof HierNodeLib.HierNode
			 * 
			 * @returns {?Object} The previous node of the given node.
			 */
			ThisNode.PrevNode = function PrevNode()
			{
				return this._hnPrevNode;
			};


			//==========================================
			/**
			 * @function NextNode
			 * @memberof HierNode
			 * 
			 * @returns {?Object} The next node of the given node.
			 */
			ThisNode.NextNode = function()
			{
				return this._hnNextNode;
			};


			//==========================================
			/**
			 * @function Indent
			 * @memberof HierNodeLib.HierNode
			 * 
			 * @returns {Number} The indent level of the given node.
			 */
			ThisNode.Indent = function()
			{
				return this._hnIndent;
			};


			//==========================================
			/**
			 * @function CloneObject
			 * @memberof HierNodeLib.HierNode
			 * 
			 * @param {Object} ThisObject - The object to clone.
			 * 
			 * @returns {Object} The cloned object.
			 */
			ThisNode.CloneObject = function(ThisObject)
			{ // Based on: http://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
				var copy;

				// Handle the 3 simple types, and null or undefined
				if (null == ThisObject || "object" != typeof ThisObject) return ThisObject;

				// Handle Date
				if (ThisObject instanceof Date)
				{
					copy = new Date();
					copy.setTime(ThisObject.getTime());
					return copy;
				}

				// Handle Array
				if (ThisObject instanceof Array)
				{
					copy = [];
					for (var i = 0, len = ThisObject.length; i < len; i++)
					{
						copy[i] = this.CloneObject(ThisObject[i]);
					}
					return copy;
				}

				// Handle Object
				if (ThisObject instanceof Object)
				{
					copy = {};
					for (var attr in ThisObject)
					{
						if (ThisObject.hasOwnProperty(attr)) copy[attr] = this.CloneObject(ThisObject[attr]);
					}
					return copy;
				}

				throw new Error("Unable to copy obj! Its type isn't supported.");
			};


			//==========================================
			/**
			 * @function CloneNode
			 * @memberof HierNodeLib.HierNode
			 * 
			 * @returns {Object} The cloned node.
			 */
			ThisNode.CloneNode = function()
			{
				var prev = this._hnPrevNode;
				var next = this._hnNextNode;
				this._hnPrevNode = null;
				this._hnNextNode = null;
				var node = this.CloneObject(this);
				// node = HierNode(node);
				// node._hnIndent = ThisNode._hnIndent;
				this._hnPrevNode = prev;
				this._hnNextNode = next;
				return node;
			};


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
			/** @enum {string} RelationshipTypes
			 * @memberof HierNodeLib.HierNode
			 * @readonly
			 * @summary Relationship types used for calling FindRelative().
			 */
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
			/** @function FindRelative
			 * @memberof HierNodeLib.HierNode
			 * 
			 * @summary
			 * Finds a single other node within the hierarchy of a specific relation
			 * to the given node.
			 * 
			 * @param {string} RelationshipType - The type of node to look for.
			 * 
			 * @returns {?Object} The node found by the RelationshipType, or null if not found.
			 * 
			 * @description
			 * The RelationshipType parameter must be one of:
			 * 
			 *	PrevNode : Finds the immediately previous node.
			 *	NextNode : Finds the immediately next node.
			 *	FirstNode : Finds the very first node. This will also always be the root node.
			 *	LastNode : Finds the very last node.
			 *	RootNode : Finds the root node.
			 *	ParentNode : Finds the parent node.
			 *	PrevSibNode : Finds the previous sibling node.
			 *	NextSibNode : Finds the next sibling node.
			 *	FirstSibNode : Finds the first sibling node.
			 *	LastSibNode : Finds the last sibling node.
			 *	FirstChildNode : Finds the first child node.
			 *	LastChildNode : Finds the last child node.
			 *	FirstDescNode : Finds the first descendent node.
			 *	LastDescNode : Finds the last descendent node.
			 */
			//==========================================

			ThisNode.FindRelative = function(RelationshipType)
			{
				var node_prev = this._hnPrevNode;
				var node_next = this._hnNextNode;
				var node_root = this;
				var node_sib = this;
				var node_child = null;
				while (true)
				{
					if (RelationshipType === RelationshipTypes.PrevNode)
					{
						return this._hnPrevNode;
					}
					else if (RelationshipType === RelationshipTypes.NextNode)
					{
						return this._hnNextNode;
					}
					else if (RelationshipType === RelationshipTypes.FirstNode)
					{
						if (node_prev === null)
						{
							return this;
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
							return this;
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
						if (node_prev._hnIndent < this._hnIndent)
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
						if (node_prev._hnIndent < this._hnIndent)
						{
							break;
						}
						if (node_prev._hnIndent === this._hnIndent)
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
						if (node_next._hnIndent < this._hnIndent)
						{
							break;
						}
						if (node_next._hnIndent === this._hnIndent)
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
						if (node_prev._hnIndent < this._hnIndent)
						{
							return node_sib;
						}
						if (node_prev._hnIndent === this._hnIndent)
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
						if (node_next._hnIndent < this._hnIndent)
						{
							return node_sib;
						}
						if (node_next._hnIndent === this._hnIndent)
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
						if (node_next._hnIndent <= this._hnIndent)
						{
							break;
						}
						if (node_next._hnIndent === (this._hnIndent + 1))
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
						if (node_next._hnIndent <= this._hnIndent)
						{
							return node_child;
						}
						if (node_next._hnIndent === (this._hnIndent + 1))
						{
							node_child = node_next;
						}
						node_next = node_next._hnNextNode;
					}
					else if (RelationshipType === RelationshipTypes.FirstDescNode)
					{
						if (node_next)
						{
							if (node_next._hnIndent > this._hnIndent)
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
						if (node_next._hnIndent <= this._hnIndent)
						{
							return node_child;
						}
						if (node_next._hnIndent > this._hnIndent)
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
			};


			//==========================================
			/** @function FindFirst
			 * @memberof HierNodeLib.HierNode
			 * @summary Find the first node in the hierarchy.
			 */
			ThisNode.FindFirst = function()
			{
				return this.FindRelative(RelationshipTypes.FirstNode);
			};

			//==========================================
			/** @function FindLast
			 * @memberof HierNodeLib.HierNode
			 * @summary Find the last node in the hierarchy.
			 */
			ThisNode.FindLast = function()
			{
				return this.FindRelative(RelationshipTypes.LastNode);
			};

			//==========================================
			/** @function FindRoot
			 * @memberof HierNodeLib.HierNode
			 * @summary Find the root node of the hierarchy.
			 */
			ThisNode.FindRoot = function()
			{
				return this.FindRelative(RelationshipTypes.RootNode);
			};

			//==========================================
			/** @function FindParent
			 * @memberof HierNodeLib.HierNode
			 * @summary Find the parent of this node.
			 */
			ThisNode.FindParent = function()
			{
				return this.FindRelative(RelationshipTypes.ParentNode);
			};

			//==========================================
			/** @function FindPrevSibling
			 * @memberof HierNodeLib.HierNode
			 * @summary Find the previous sibling of this node.
			 */
			ThisNode.FindPrevSibling = function()
			{
				return this.FindRelative(RelationshipTypes.PrevSibNode);
			};

			//==========================================
			/** @function FindNextSibling
			 * @memberof HierNodeLib.HierNode
			 * @summary Find the next sibling of this node.
			 */
			ThisNode.FindNextSibling = function()
			{
				return this.FindRelative(RelationshipTypes.NextSibNode);
			};

			//==========================================
			/** @function FindFirstSibling
			 * @memberof HierNodeLib.HierNode
			 * @summary Find the first sibling of this node.
			 */
			ThisNode.FindFirstSibling = function()
			{
				return this.FindRelative(RelationshipTypes.FirstSibNode);
			};

			//==========================================
			/** @function FindLastSibling
			 * @memberof HierNodeLib.HierNode
			 * @summary Find the last sibling of this node.
			 */
			ThisNode.FindLastSibling = function()
			{
				return this.FindRelative(RelationshipTypes.LastSibNode);
			};

			//==========================================
			/** @function FindFirstChild
			 * @memberof HierNodeLib.HierNode
			 * @summary Find the first child of this node.
			 */
			ThisNode.FindFirstChild = function()
			{
				return this.FindRelative(RelationshipTypes.FirstChildNode);
			};

			//==========================================
			/** @function FindLastChild
			 * @memberof HierNodeLib.HierNode
			 * @summary Find the last child of this node.
			 */
			ThisNode.FindLastChild = function()
			{
				return this.FindRelative(RelationshipTypes.LastChildNode);
			};

			//==========================================
			/** @function FindFirstDescendent
			 * @memberof HierNodeLib.HierNode
			 * @summary Find the first descendent of this node.
			 * This will always be the same as FindFirstChild().
			 */
			ThisNode.FindFirstDescendent = function()
			{
				return this.FindRelative(RelationshipTypes.FirstDescNode);
			};

			//==========================================
			/** @function FindLastDescendent
			 * @memberof HierNodeLib.HierNode
			 * @summary Find the last descendent of this node.
			 */
			ThisNode.FindLastDescendent = function()
			{
				return this.FindRelative(RelationshipTypes.LastDescNode);
			};


			//=====================================================================
			//=====================================================================
			//          __    ___      ___    __       
			//  \  / | /__` |  |   /\   |  | /  \ |\ | 
			//   \/  | .__/ |  |  /~~\  |  | \__/ | \| 
			//                                         
			//=====================================================================
			//=====================================================================


			//==========================================
			/** @enum VisitationTypes
			 * @memberof HierNodeLib.HierNode
			 * @summary Visitation types used for calling VisitNodes().
			 */
			var VisitationTypes = {
				AllNodes: 'AllNodes',
				PrevNodes: 'PrevNodes',
				NextNodes: 'NextNodes',
				ParentNodes: 'ParentNodes',
				SiblingNodes: 'SiblingNodes',
				PrevSibNodes: 'PrevSibNodes',
				NextSibNodes: 'NextSibNodes',
				ChildNodes: 'ChildNodes',
				DecendentNodes: 'DecendentNodes',
			};


			//==========================================
			/** @function VisitNodes
			 * @memberof HierNodeLib.HierNode
			 * 
			 * @summary
			 * Visits every one of a class of nodes defined by VisitationType.
			 * 
			 * @param {!Object} NodeVisitor - The operation to perform on each node visited.
			 * @param {string} VisitationType - Identifies which nodes to visit.
			 * @param {?boolean} [IncludeThis = false] - `ThisNode` will be included and visited frst.
			 * 
			 * @returns {!Object} The given NodeVisitor parameter.
			 * 
			 * @description
			 * The VisitationType parameter must be one of:
			 * 
			 *	AllNodes : Visit all node in the hierarchy (depth-first).
			 *	PrevNodes : Visits all the nodes previous to this one (backwards).
			 *	NextNodes : Visits all the nodes after this one (forewards).
			 *	ParentNodes : Visits all the parents of this node (upwards).
			 *	SiblingNodes : Visits all the siblings of this node (sideways).
			 *	PrevSibNodes : Visits all the siblings previous to this one.
			 *	NextSibNodes : Visits all the siblings after this one.
			 *	ChildNodes : Visits all the child nodes of this one. (downwards)
			 *	DecendentNodes : Visits all the descendent nodes of this one. (downwards)
			 */
			//==========================================

			ThisNode.VisitNodes = function(NodeVisitor, VisitationType, IncludeThis = false)
			{
				var start_relative = null;
				var next_relative = null;
				var visit_descendents_only = null;

				// Set the visitation parameters.
				if (VisitationType == VisitationTypes.AllNodes)
				{
					start_relative = RelationshipTypes.FirstNode;
					next_relative = RelationshipTypes.NextNode;
				}
				else if (VisitationType == VisitationTypes.PrevNodes)
				{
					start_relative = RelationshipTypes.PrevNode;
					next_relative = RelationshipTypes.PrevNode;
				}
				else if (VisitationType == VisitationTypes.NextNodes)
				{
					start_relative = RelationshipTypes.NextNode;
					next_relative = RelationshipTypes.NextNode;
				}
				else if (VisitationType == VisitationTypes.ParentNodes)
				{
					start_relative = RelationshipTypes.ParentNode;
					next_relative = RelationshipTypes.ParentNode;
				}
				else if (VisitationType == VisitationTypes.SiblingNodes)
				{
					start_relative = RelationshipTypes.FirstSibNode;
					next_relative = RelationshipTypes.NextSibNode;
				}
				else if (VisitationType == VisitationTypes.PrevSibNodes)
				{
					start_relative = RelationshipTypes.PrevSibNode;
					next_relative = RelationshipTypes.PrevSibNode;
				}
				else if (VisitationType == VisitationTypes.NextSibNodes)
				{
					start_relative = RelationshipTypes.NextSibNode;
					next_relative = RelationshipTypes.NextSibNode;
				}
				else if (VisitationType == VisitationTypes.ChildNodes)
				{
					start_relative = RelationshipTypes.FirstChildNode;
					next_relative = RelationshipTypes.NextSibNode;
					visit_descendents_only = true;
				}
				else if (VisitationType == VisitationTypes.DecendentNodes)
				{
					start_relative = RelationshipTypes.FirstChildNode;
					next_relative = RelationshipTypes.NextNode;
					visit_descendents_only = true;
				}
				else
				{
					throw Error("Unknown VisitationType [" + VisitationType + "].");
				}

				// Initialize the visitor.
				if (NodeVisitor.Init)
				{
					if (!NodeVisitor.Init(this, NodeVisitor, VisitationType, IncludeThis))
					{
						return NodeVisitor;
					}
				}

				// Visit this node first.
				if (IncludeThis)
				{
					if (!NodeVisitor.Visit(this))
					{
						return NodeVisitor;
					}
				}

				// Get the starting node.
				var node = this.FindRelative(start_relative);
				while (node)
				{
					// Check if we are visiting only descendent nodes.
					if (visit_descendents_only)
					{
						// Exit if we have run out of descendent nodes to visit.
						if (node._hnIndent <= this._hnIndent)
						{
							break;
						}
					}
					// Visit the node.
					if (!NodeVisitor.Visit(node))
					{
						break;
					}
					// Get the next node to visit.
					node = node.FindRelative(next_relative);
				}

				// Return the NodeVisitor.
				return NodeVisitor;
			};


			//==========================================
			/** @function FindLastDescendent
			 * @memberof HierNodeLib.HierNode
			 * @summary Visit all the nodes.
			 */
			ThisNode.VisitAll = function(NodeVisitor)
			{
				return this.VisitNodes(NodeVisitor, VisitationTypes.PrevNodes, false);
			};

			//==========================================
			/** @function FindLastDescendent
			 * @memberof HierNodeLib.HierNode
			 * @summary Visit the previous node.
			 */
			ThisNode.VisitPrevious = function(NodeVisitor, IncludeThis = false)
			{
				return this.VisitNodes(NodeVisitor, VisitationTypes.PrevNodes);
			};

			//==========================================
			/** @function FindLastDescendent
			 * @memberof HierNodeLib.HierNode
			 * @summary Visit the next node.
			 */
			ThisNode.VisitNext = function(NodeVisitor, IncludeThis = false)
			{
				return this.VisitNodes(NodeVisitor, VisitationTypes.NextNodes);
			};

			//==========================================
			/** @function VisitParents
			 * @memberof HierNodeLib.HierNode
			 * @summary Visit all the parents of this node.
			 */
			ThisNode.VisitParents = function(NodeVisitor, IncludeThis = false)
			{
				return this.VisitNodes(NodeVisitor, VisitationTypes.ParentNodes);
			};

			//==========================================
			/** @function VisitSiblings
			 * @memberof HierNodeLib.HierNode
			 * @summary Visit all the siblings of this node, including this one.
			 */
			ThisNode.VisitSiblings = function(NodeVisitor)
			{
				return this.VisitNodes(NodeVisitor, VisitationTypes.SiblingNodes, false);
			};

			//==========================================
			/** @function VisitPreviousSiblings
			 * @memberof HierNodeLib.HierNode
			 * @summary Visit all the previous siblings of this node.
			 */
			ThisNode.VisitPreviousSiblings = function(NodeVisitor, IncludeThis = false)
			{
				return this.VisitNodes(NodeVisitor, VisitationTypes.PrevSibNodes);
			};

			//==========================================
			/** @function VisitNextSiblings
			 * @memberof HierNodeLib.HierNode
			 * @summary Visit all the next siblings of this node.
			 */
			ThisNode.VisitNextSiblings = function(NodeVisitor, IncludeThis = false)
			{
				return this.VisitNodes(NodeVisitor, VisitationTypes.NextSibNodes);
			};

			//==========================================
			/** @function VisitChildren
			 * @memberof HierNodeLib.HierNode
			 * @summary Visit all the children of this node.
			 */
			ThisNode.VisitChildren = function(NodeVisitor, IncludeThis = false)
			{
				return this.VisitNodes(NodeVisitor, VisitationTypes.ChildNodes);
			};

			//==========================================
			/** @function VisitDescendents
			 * @memberof HierNodeLib.HierNode
			 * @summary Visit all the descendents of this node.
			 */
			ThisNode.VisitDescendents = function(NodeVisitor, IncludeThis = false)
			{
				return this.VisitNodes(NodeVisitor, VisitationTypes.DecendentNodes);
			};

			//------------------------------------------
			// Scanning
			//------------------------------------------

			ThisNode.ChildCount = function()
			{
				return this.VisitNodes(new HierNodeLib.CountingVisitor(), VisitationTypes.ChildNodes, false).Count;
			};

			ThisNode.Children = function(IncludeThis = false)
			{
				return this.VisitNodes(new HierNodeLib.CollectingVisitor(), VisitationTypes.ChildNodes, IncludeThis).Nodes;
			};

			ThisNode.Child = function(ChildIndex)
			{
				return this.VisitNodes(new HierNodeLib.IndexSelectorVisitor(ChildIndex), VisitationTypes.ChildNodes, false).Node;
			};

			ThisNode.SearchChildren = function(PropertyName, PropertyValue, IncludeThis = false)
			{
				return this.VisitNodes(new HierNodeLib.PropertySearchVisitor(PropertyName, PropertyValue), VisitationTypes.ChildNodes, IncludeThis).Nodes;
			};

			ThisNode.SearchFirstChild = function(PropertyName, PropertyValue, IncludeThis = false)
			{
				return this.VisitNodes(new HierNodeLib.PropertySearchFirstVisitor(PropertyName, PropertyValue), VisitationTypes.ChildNodes, IncludeThis).Node;
			};

			ThisNode.DescendentCount = function()
			{
				return this.VisitNodes(new HierNodeLib.CountingVisitor(), VisitationTypes.DecendentNodes, false).Count;
			};

			ThisNode.Descendents = function(IncludeThis = false)
			{
				return this.VisitNodes(new HierNodeLib.CollectingVisitor(), VisitationTypes.DecendentNodes, IncludeThis).Nodes;
			};

			ThisNode.SearchDescendents = function(PropertyName, PropertyValue, IncludeThis = false)
			{
				return this.VisitNodes(new HierNodeLib.PropertySearchVisitor(PropertyName, PropertyValue), VisitationTypes.DecendentNodes, IncludeThis).Nodes;
			};

			ThisNode.SearchFirstDescendent = function(PropertyName, PropertyValue, IncludeThis = false)
			{
				return this.VisitNodes(new HierNodeLib.PropertySearchFirstVisitor(PropertyName, PropertyValue), VisitationTypes.DecendentNodes, IncludeThis).Node;
			};


			//=====================================================================
			//=====================================================================
			//                    ___  ___                 __   ___ 
			//   |\/|  /\  | |\ |  |  |__  |\ |  /\  |\ | /  ` |__  
			//   |  | /~~\ | | \|  |  |___ | \| /~~\ | \| \__, |___ 
			//                                                      
			//=====================================================================
			//=====================================================================


			//==========================================
			/**
			 * @function Link
			 * @memberof HierNodeLib.HierNode
			 * @private
			 * 
			 * @summary Links a node within a doubly-linked list.
			 * 
			 * @param {Object} PrevNode - The previous node to link to.
			 * @param {Object} NextNode - The next node to link to.
			 * 
			 * @returns {!Object} `this`
			 */
			ThisNode.Link = function(PrevNode, NextNode)
			{
				if (this._hnPrevNode || this._hnNextNode)
				{
					throw new Error("This node is already linked.");
				}
				this._hnPrevNode = PrevNode;
				this._hnNextNode = NextNode;
				if (this._hnPrevNode)
				{
					this._hnPrevNode._hnNextNode = this;
				}
				if (this._hnNextNode)
				{
					this._hnNextNode._hnPrevNode = this;
				}
				return this;
			};


			//==========================================
			/**
			 * @function Unlink
			 * @memberof HierNodeLib.HierNode
			 * @private
			 * 
			 * @summary
			 * Unlinks a node from a doubly-linked list and relinks its Previous and
			 * Next nodes if they exist.
			 * 
			 * @returns {!Object} `this`
			 */
			ThisNode.Unlink = function()
			{
				var prev_node = this._hnPrevNode;
				var next_node = this._hnNextNode;
				this._hnPrevNode = null;
				this._hnNextNode = null;
				if (prev_node)
				{
					prev_node._hnNextNode = next_node;
				}
				if (next_node)
				{
					next_node._hnPrevNode = prev_node;
				}
				return this;
			};


			//==========================================
			/**
			 * @function AddChild
			 * @memberof HierNodeLib.HierNode
			 * 
			 * @summary Adds a new item as a child of ThisNode.
			 * 
			 * @param {Object=} [ChildNode = Object] - The child object to add.
			 * @param {number=} [ChildIndex = -1] - The index at which to add the child.
			 * 
			 * @returns {!Object} The newly added child node.
			 */
			ThisNode.AddChild = function(ChildNode = new Object(), ChildIndex = -1)
			{
				ChildNode = HierNodeLib.HierNode(ChildNode);

				var prev_node = this;
				var next_node = this._hnNextNode;
				while (next_node)
				{
					if (next_node._hnIndent === (this._hnIndent + 1))
					{
						// A direct child was found.
						if (ChildIndex === 0)
						{
							// This is the child we are looking for. Insert.
							ChildNode.Link(prev_node, next_node);
							ChildNode._hnIndent = this._hnIndent + 1;
							return ChildNode;
						}
						ChildIndex--;
					}
					else if (next_node._hnIndent <= this._hnIndent)
					{
						// No more child nodes. Append.
						ChildNode.Link(prev_node, next_node);
						ChildNode._hnIndent = this._hnIndent + 1;
						return ChildNode;
					}
					// Update the nodes we are looking for.
					prev_node = next_node;
					next_node = next_node._hnNextNode;
				}

				// No more nodes. Append.
				ChildNode.Link(prev_node, null);
				ChildNode._hnIndent = this._hnIndent + 1;
				return ChildNode;
			};


			//==========================================
			/**
			 * @function AddChildren
			 * @memberof HierNodeLib.HierNode
			 * 
			 * @summary Rebuilds a hierarchy from an array of nodes.
			 * 
			 * @param {Array} NodeArray - The array of nodes or objects.
			 * 
			 * @returns {?Object} `this`.
			 * 
			 * @description
			 * Rebuilds a hierarchy from an array of nodes.
			 */
			ThisNode.AddChildren = function(NodeArray)
			{
				if (NodeArray.length == 0)
				{
					return this;
				}

				var parent_node = this;
				var prev_node = this;
				var prev_indent = this._hnIndent;
				var curr_indent = 0;
				for (var index = 0; index < NodeArray.length; index++)
				{
					curr_indent = NodeArray[index]._hnIndent || 0;
					if (curr_indent == prev_indent)
					{
						parent_node = parent_node.FindRelative(RelationshipTypes.ParentNode);
						prev_indent = parent_node._hnIndent;
					}
					else if (curr_indent > prev_indent)
					{
						parent_node = prev_node;
						prev_indent = prev_node._hnIndent;
					}
					else if (curr_indent < prev_indent)
					{
						parent_node = parent_node.FindRelative(RelationshipTypes.ParentNode);
						prev_indent = parent_node._hnIndent;
					}

					if (!parent_node)
					{
						break;
					}

					prev_node = parent_node.AddChild(NodeArray[index]);
				}
				return this;
			};


			//==========================================
			/**
			 * @function RemoveChild
			 * @memberof HierNodeLib.HierNode
			 * 
			 * @summary Adds a new item as a child of ThisNode.
			 * 
			 * @param {number} ChildIndex - The index of the child to remove.
			 * 
			 * @returns {?Object} The removed child node.
			 */
			ThisNode.RemoveChild = function(ChildIndex)
			{
				var child = this.VisitNodes(
					new HierNodeLib.IndexSelectorVisitor(ChildIndex),
					VisitationTypes.ChildNodes
				).Node;
				if (!child)
				{
					return null;
				}

				var last_desc = child.FindRelative(RelationshipTypes.LastDescNode);
				if (last_desc)
				{
					child._hnPrevNode._hnNextNode = last_desc._hnNextNode;
					if (last_desc._hnNextNode)
					{
						last_desc._hnNextNode._hnPrevNode = child._hnPrevNode;
					}
				}
				else
				{
					child._hnPrevNode._hnNextNode = null;
				}

				child._hnPrevNode = null;
				child._hnNextNode = null;
				return child;
			};


			//==========================================
			/**
			 * @function RemoveChildren
			 * @memberof HierNodeLib.HierNode
			 * 
			 * @summary Removes all children from this node.
			 */
			ThisNode.RemoveChildren = function()
			{
				var last_desc = this.FindRelative(RelationshipTypes.LastDescNode);
				if (last_desc)
				{
					last_desc._hnPrevNode = this;
					this._hnNextNode = last_desc._hnNextNode;
					if (last_desc._hnNextNode)
					{
						last_desc._hnNextNode._hnPrevNode = this;
					}
				}
				return;
			};


			//=====================================================================
			//=====================================================================
			//           __   __   ___                      ___  __        __  
			//   |\/| | /__` /  ` |__  |    |     /\  |\ | |__  /  \ |  | /__` 
			//   |  | | .__/ \__, |___ |___ |___ /~~\ | \| |___ \__/ \__/ .__/ 
			//                                                                 
			//=====================================================================
			//=====================================================================


			//==========================================
			/**
			 * @function TextGraph
			 * @memberof HierNodeLib.HierNode
			 * 
			 * @summary Renders a graph of the hierarchy using text characters.
			 * 
			 * @param {string} TextProperty - The property to use for the node in the graph
			 *									(e.g. it's name or other text value).
			 * @param {boolean=} [IncludeThis = false] - Include the root in the output.
			 * @param {string=} [IndentText = '\t'] - The characters to use to indent each node.
			 * @param {string=} [EolText = '\n'] - The characters to use after each node.
			 * 
			 * @returns {string} The text graph as a string.
			 */
			ThisNode.TextGraph = function(TextProperty, IncludeThis = false, IndentText = '\t', EolText = '\n')
			{
				var text_graph = '';
				if (IncludeThis)
				{
					text_graph = this[TextProperty];
				}
				var root_indent = this._hnIndent;
				var next_node = this._hnNextNode;
				while (true)
				{
					if (!next_node)
					{
						break;
					}
					if (next_node._hnIndent <= root_indent)
					{
						break;
					}
					text_graph += EolText;
					var start_index = 1;
					if (!IncludeThis)
					{
						start_index++;
					}
					for (var index = start_index; index <= (next_node._hnIndent - root_indent); index++)
					{
						text_graph += IndentText;
					}
					text_graph += next_node[TextProperty];
					next_node = next_node._hnNextNode;
				}
				return text_graph;
			};


			//==========================================
			/**
			 * @function TextPath
			 * @memberof HierNodeLib.HierNode
			 * 
			 * @summary Retrieves the text path of a node.
			 * 
			 * @param {string} TextProperty - The name of the property containing the path elements.
			 * @param {boolean=} [IncludeRoot = true] - The root node will be included in the path.
			 * @param {string=} [Delimiter = '/'] - The character(s) used to delimit the path elements.
			 * 
			 * @returns {string} The text path of the node.
			 * 
			 * @description
			 * Retrieves the text path of a node.
			 */
			ThisNode.TextPath = function(TextProperty, IncludeRoot = true, Delimiter = '/')
			{
				var nodes = this.VisitNodes(
					new HierNodeLib.CollectingVisitor(),
					VisitationTypes.ParentNodes,
					true
				).Nodes;
				var last_index = nodes.length - 1;
				if (!IncludeRoot)
				{
					last_index--;
				}
				var text_path = '';
				for (var index = 0; index <= last_index; index++)
				{
					text_path = Delimiter + nodes[index][TextProperty] + text_path;
				}
				return text_path;
			};


			//==========================================
			/**
			 * @function FindPath
			 * @memberof HierNodeLib.HierNode
			 * 
			 * @summary Locates a node given a text path string.
			 * 
			 * @param {string} TextPath - The path of the node to return.
			 * @param {string} TextProperty - The name of the property containing the path elements.
			 * @param {boolean=} [IncludeThis = false] - The path includes the `ThisNode`.
			 * @param {string=} [Delimiter = '/'] - The character(s) used to delimit the path elements.
			 * 
			 * @returns {?Object} The located node, or null if not found.
			 * 
			 * @description
			 * Given a text path to a node (e.g. `/A1/B1/C2`), this function will return that node.
			 * 
			 * The `TextPath` parameter is a string and is similar to strings returned by the `TextPath` function.
			 * 
			 * The `Delimiter` parameter separates the elements of the path within `TextPath`.
			 * If `Delimiter` is empty, `ThisNode` will be returned.
			 */
			ThisNode.FindPath = function(TextPath, TextProperty, IncludeThis = false, Delimiter = '/')
			{
				if (!Delimiter)
				{
					return this;
				}
				var text_path = TextPath;
				var node = this;
				while (node && (text_path.length > 0))
				{
					while (text_path.indexOf(Delimiter) == 0)
					{
						text_path = text_path.substr(Delimiter.length);
					}
					if (text_path.length > 0)
					{
						var ich = text_path.indexOf(Delimiter);
						if (ich < 0)
						{
							ich = text_path.length;
						}
						var text_value = text_path.substr(0, ich);
						text_path = text_path.substr(ich);
						node = node.VisitNodes(
							new HierNodeLib.PropertySearchFirstVisitor(TextProperty, text_value),
							VisitationTypes.ChildNodes
						).Node;
					}
				}
				return node;
			};


			//------------------------------------------
			// Return the Node.

			return ThisNode;

		},


		//==========================================
		/**
		 * @interface TextNode
		 * @memberof HierNodeLib
		 * 
		 * @summary
		 * Adds a Text property to a HierNode object.
		 */
		TextNode: function(ThisText = "")
		{
			var node = HierNodeLib.HierNode(
			{
				Text: ThisText
			});

			node.AddChildText = function(ThisText = "", ChildIndex = -1)
			{
				return this.AddChild(HierNodeLib.TextNode(ThisText), ChildIndex);
			};

			return node;
		},



		//=====================================================================
		//=====================================================================
		//          __    ___  __   __   __  
		//  \  / | /__` |  |  /  \ |__) /__` 
		//   \/  | .__/ |  |  \__/ |  \ .__/ 
		//                                   
		//=====================================================================
		//=====================================================================


		//==========================================
		/**
		 * @class NullVisitor
		 * @memberof HierNodeLib
		 * @constructor
		 * @summary A visitor which performs no action.
		 */
		NullVisitor: function()
		{
			this.Init = function(ThisNode, NodeVisitor, VisitationType, IncludeThis)
			{
				return true;
			}
			this.Visit = function(ThisNode)
			{
				return true;
			};
		},


		//==========================================
		/**
		 * @class CountingVisitor
		 * @memberof HierNodeLib
		 * @constructor
		 * @summary A visitor which counts nodes.
		 */
		CountingVisitor: function()
		{
			this.Count = 0;
			this.Visit = function(ThisNode)
			{
				this.Count++;
				return true;
			};
		},


		//==========================================
		/**
		 * @class CollectingVisitor
		 * @memberof HierNodeLib
		 * @constructor
		 * @summary A visitor which collects nodes into an array.
		 */
		CollectingVisitor: function(CloneNodes = false)
		{
			this.Nodes = [];
			this.RootIndent = 0;
			this.Init = function(ThisNode, NodeVisitor, VisitationType, IncludeThis)
			{
				this.RootIndent = ThisNode._hnIndent;
				return true;
			}
			this.Visit = function(ThisNode)
			{
				var node = ThisNode;
				if (CloneNodes)
				{
					node = node.CloneNode();
					node = HierNodeLib.HierNode(node);
					node._hnIndent = ThisNode._hnIndent - this.RootIndent;
				}
				this.Nodes.push(node);
				return true;
			};
		},


		//==========================================
		/**
		 * @class IndexSelectorVisitor
		 * @memberof HierNodeLib
		 * @constructor
		 * @summary A visitor which selects the Index'th node visited.
		 */
		IndexSelectorVisitor: function(Index)
		{
			this.Index = Index;
			this.Count = 0;
			this.Node = null;
			this.Visit = function(ThisNode)
			{
				this.Count++;
				if (this.Count > this.Index)
				{
					this.Node = ThisNode;
					return false;
				}
				return true;
			};
		},


		//==========================================
		/**
		 * @class PropertySearchVisitor
		 * @memberof HierNodeLib
		 * @constructor
		 * @summary A visitor which collects nodes where PropertyName = PropertyValue.
		 */
		PropertySearchVisitor: function(PropertyName, PropertyValue, MaxResults = 0)
		{
			this.PropertyName = PropertyName;
			this.PropertyValue = PropertyValue;
			this.MaxResults = MaxResults;
			this.Nodes = [];
			this.Visit = function(ThisNode)
			{
				if (this.MaxResults && (this.Nodes.length >= this.MaxResults))
				{
					return false;
				}
				if (ThisNode[PropertyName] === PropertyValue)
				{
					this.Nodes.push(ThisNode);
				}
				return true;
			};
		},


		//==========================================
		/**
		 * @class PropertySearchFirstVisitor
		 * @memberof HierNodeLib
		 * @constructor
		 * @summary A visitor which selects the first node where PropertyName = PropertyValue.
		 */
		PropertySearchFirstVisitor: function(PropertyName, PropertyValue)
		{
			this.PropertyName = PropertyName;
			this.PropertyValue = PropertyValue;
			this.Node = null;
			this.Visit = function(ThisNode)
			{
				if (ThisNode[PropertyName] == PropertyValue)
				{
					this.Node = ThisNode;
					return false;
				}
				return true;
			};
		}

	}

}());


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
	window['HierNode'] = HierNodeLib.HierNode;
	window['TextNode'] = HierNodeLib.TextNode;
}
