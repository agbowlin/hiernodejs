

	        ___  __        __   __   ___       __  
	|__| | |__  |__) |\ | /  \ |  \ |__     | /__` 
	|  | | |___ |  \ | \| \__/ |__/ |___ \__/ .__/ 
	                                             

---------------------------------------------------------------------

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

## History

[current](https://github.com/agbowlin/hiernodejs/tree/master) : [now]

[v0.1.11](https://github.com/agbowlin/hiernodejs/tree/v0.1.11) : [???]
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

- [COMPLETED] function PropertySearchVisitor(PropertyName, PropertyValue)
	- A visitor object that collects nodes where the PropertyValue is found within
		the property PropertyName.

- function BuildPath( KeyProperty, Delimiter = '/' )
	- Builds a delimited path to this node from the root. The resulting path will
		be constructed using the KeyProperty property and will contain a leading
		delimiter.

- function ParsePath( KeyProperty, Path, Delimiter = '' )
	- Returns the node designated by the given Path. If the Delimiter is blank,
		the Delimiter will be auto-detected from the first character of the Path.

- function DescendentsToArray()
	- Flattens the hierarchy of descendents to an array.

- function DescendentsFromArray( Array )
	- Rebuilds the hierarchy of descendents from an array.

- Revert to VisitRelatives( ThisNode, RelativeType, Visitor )
	- Use wrappers for VisitParents, etc.

- Other
	- More formal build tool (gulp or grunt?)
	- More formal testing tool (qunit?)
	- Support JSDoc
