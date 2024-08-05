import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

const RectangleSkeltonLoader = (props: any) => (
	<ContentLoader
		speed={1}
		width={200}
		height={260}
		viewBox="0 0 200 260"
		backgroundColor="#b5b5b5"
		foregroundColor="#ecebeb"
		{...props}
	>
		<Rect x="-310" y="-150" rx="1" ry="1" width="500" height="400" />
	</ContentLoader>


)

export default RectangleSkeltonLoader

