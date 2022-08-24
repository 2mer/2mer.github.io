import { useEffect, useRef, useState } from "react";
import { Editor, EditorOptions } from '@sgty/pixil';

export default function useEditor(options: EditorOptions, cb = (e: Editor) => ((() => { }) as (void | (() => void)))) {
	const ref = useRef<any>();
	const [editor, setEditor] = useState<Editor>();

	useEffect(() => {
		const ed = new Editor(options);

		const node = ref.current;

		node.appendChild(ed.app.view);

		setEditor(ed);
		const cleanup = cb(ed);

		return () => {
			node.removeChild(ed.app.view);
			ed.app.destroy();
			cleanup?.();
		}

	}, [])

	const isReady = Boolean(editor);

	return [ref, editor as Editor, isReady] as const;
}