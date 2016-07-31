

	 _ _  _            _ _         _        _  ___ 
	| | |<_> ___  _ _ | \ | ___  _| | ___  | |/ __>
	|   || |/ ._>| '_>|   |/ . \/ . |/ ._>_| |\__ \
	|_|_||_|\___.|_|  |_\_|\___/\___|\___.\__/<___/
	                                             

	D3 = C2.Prev        A1
	C3 = C2.Next         +- B1
	A1 = C1.First        |   +- C1
	C7 = C1.Last         |   |   +- D1
	A1 = C1.Root         |   |   +- D2
	B1 = C1.Parent       |   |   +- D3
	C1 = C2.PrevSib      |   +- C2
	C2 = C1.NextSib      |   +- C3
	C1 = C1.FirstSib     +- B2
	C3 = C1.LastSib      |   +- C4
	B1 = A1.FirstChild   |   +- C5
	B3 = A1.LastChild    |   +- C6
	B1 = A1.FirstDesc    +- B3
	C7 = A1.LastDesc         +- C7

---------------------------------------------------------------------

## Installation

**Bower**

	bower install hiernodejs

**NPM**

	npm install hiernodejs

---------------------------------------------------------------------

## Usage

**HTML Page**

	<script type="text/javascript" src="bower_component/hiernodejs/hiernode.js"></script>

or

	<script type="text/javascript" src="bower_component/hiernodejs/hiernode.min.js"></script>


**Using with Simple Objects**

	// Create a (root) node.
	var node = HierNode();
	node.Name = "People";
	
	// Create a child node.
	var child = node.AddChild();
	child.Name = "Alice";
	
	// Test the relationships.
	if( child.PrevNode() === node ) { Alert("Yes"); }
	if( child.FindRoot() === node ) { Alert("Yes"); }
	if( node.FindFirstChild() === child ) { Alert("Yes"); }

**Using with Defined Objects**

	// Create a root node for "People".
	var node = HierNode( { "Name": "People", "IsGroup": true } );
	
	// Create some People objects.
	node.AddChild( { "Name": "Alice", "Age": 22, "Dept": "IT" } );
	node.AddChild( { "Name": "Bob", "Age": 24, "Dept": "IT" } );
	node.AddChild( { "Name": "Eve", "Age": 29, "Dept": "HR" } );

	// Search all the People objects.
	var nodes = node.SearchDescendents( "Dept", "IT" );
	// nodes is an array containing the "Alice" and "Bob" objects.

**Using with Predefined Objects**

	// Create a root node for "People".
	var node = HierNode( new MyGroup( "People" ) );
	
	// Create some People objects.
	node.AddChild( new MyPerson( "Alice", 22, "IT" ) );
	node.AddChild( new MyPerson( "Bob", 24, "IT" ) );
	node.AddChild( new MyPerson( "Eve", 29, "HR" ) );

	// Search all the People objects.
	var nodes = node.SearchDescendents( "Dept", "IT" );
	// nodes is an array containing the "Alice" and "Bob" objects.


---------------------------------------------------------------------

## History

[current](https://github.com/agbowlin/hiernodejs/tree/master) : [now]

[v0.1.12](https://github.com/agbowlin/hiernodejs/tree/v0.1.12) : [presently]
- Added functions:
	- TextPath(ThisNode, TextProperty, IncludeRoot = false, Delimiter = '/')
	- FindPath(RootNode, TextPath, TextProperty, IncludeRoot = false, Delimiter = '/')
	- NodesToArray(ThisNode, IncludeRoot = false)
	- NodesFromArray(NodeArray, IncludeRoot = false)
- Breaking changes everywhere.
	
[v0.1.11](https://github.com/agbowlin/hiernodejs/tree/v0.1.11) : [2016-07-30]
- Tightened up the HierNodeLib API.
- Added documentation (jsdoc).

[v0.1.10](https://github.com/agbowlin/hiernodejs/tree/v0.1.10) : [2016-07-26]
- Initial release.

---------------------------------------------------------------------

## License

	Copyright © 2015-2016 hiernode.js authors
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

---------------------------------------------------------------------

## TODO

- More formal build tool (gulp or grunt?)
- More formal testing tool (qunit?)
