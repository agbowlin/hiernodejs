
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
	- Use GitHub
	- Publish to Bower
	- Publish to NPM

