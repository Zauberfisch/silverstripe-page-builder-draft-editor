import React from "react"
import {Editor} from "draft-js"
import "draft-js/dist/Draft.css"
import styles from "./DraftEditor.module.scss"
import {ListControls, LinkControls, BlockStyleControls, InlineStyleControls, AlignmentControls} from "./components"
import {ElementContainer, ToolbarPortalTop, ToolbarSeparator} from "@zauberfisch/pagebuilder"
import {useEditorConfig} from "./hooks/useEditorConfig"
import {useNode} from "@craftjs/core"

export const DraftEditor = ({content, pageBuilderSpecs}) => {
	const {actions: {setProp}} = useNode()
	const changeHandler = (newValue) => {
		// eslint-disable-next-line no-param-reassign
		setProp((_props) => _props.content = newValue, 500)
	}
	const {
		blockTypes,
		inlineStyles,
		focusEditor,
		editorState,
		setEditorState,
		editorProps,
	} = useEditorConfig({value: content, changeHandler, config: pageBuilderSpecs})
	return (
		<ElementContainer padding={false}>
			<ToolbarPortalTop>
				<BlockStyleControls {...{editorState, setEditorState, blockTypes}} />
				<ToolbarSeparator />
				<AlignmentControls {...{editorState, setEditorState}} />
				<ToolbarSeparator />
				<InlineStyleControls {...{editorState, setEditorState, inlineStyles}} />
				<ToolbarSeparator />
				<ListControls {...{editorState, setEditorState}} />
				<ToolbarSeparator />
				<LinkControls {...{editorState, setEditorState}} />
			</ToolbarPortalTop>
			{/*<ToolbarPortalRow></ToolbarPortalRow>*/}
			<div onClick={focusEditor} className={styles.editorContainer}>
				<Editor editorState={editorState} onChange={setEditorState} {...editorProps} />
			</div>
		</ElementContainer>
	)
}

DraftEditor.pageBuilderSpecs = {
	defaultProps: {
		content: null,
	},
	iconName: "mdiCardTextOutline",
}
