import { useEffect, useState } from 'react'
import { Box, ColorPicker, Group, Image, SegmentedControl, Stack, Title } from '@mantine/core';
import useEditor from './useEditor';
import { Brush, CheckerboardOverlay, Editor, Eraser, OutlineOverlay, Pan } from '@sgty/pixil';
import { Brush as BrushIcon, Eraser as EraserIcon, HandStop } from 'tabler-icons-react';
import Color from 'color';
import WaveSplash from './WaveSplash';

export default function Demo() {

	const [tools, setTools] = useState([{}] as any[]);
	const [layers, setLayers] = useState([{}] as any[]);
	const [selectedTool, setSelectedTool] = useState("");
	const [selectedLayer, setSelectedLayer] = useState("");
	const [selectedColor, setSelectedColor] = useState("rgba(0,0,0,1)");

	const [ref, editor] = useEditor({
		width: 600, height: 600,
		backgroundColor: 0xF1F3F5
	}, (editor: Editor) => {

		editor.addUnderlay(new CheckerboardOverlay({ c1: 0x797979, c2: 0xc3c3c3 }));
		editor.addUnderlay(new OutlineOverlay({ width: 1, color: 0x323232 }));

		editor.setCanvasSize(600, 600);

		editor.viewport.drag({ mouseButtons: "middle" }).pinch().wheel();


		const brush = new Brush(editor, { buttons: [0] })
		const pan = new Pan(editor)
		const eraser = new Eraser(editor)

		const tools = [
			{ value: "brush", label: <BrushIcon key="brush" />, tool: brush },
			{ value: "pan", label: <HandStop key="pad" />, tool: pan },
			{ value: "eraser", label: <EraserIcon key="eraser" />, tool: eraser },
		];

		setTools(tools);
		setSelectedTool(tools[0].value);

		editor.createLayer();
		editor.createLayer();
		editor.createLayer();

		const layers = editor.layers.map((layer, index) => ({ value: `layer-${index}`, label: `Layer ${index + 1}`, layer }));
		setLayers(layers);
		setSelectedLayer(layers[0].value);

		// disable middle click scroll
		document.body.onmousedown = function (e) { if (e.button === 1) return false; }
	});

	useEffect(() => {
		if (editor) {
			const tool = tools.find(t => t.value === selectedTool)?.tool
			if (tool) {
				editor.addTool(tool)

				if (tool instanceof Brush) {

					const color = new Color(selectedColor);

					tool.color = color;
					tool.alpha = color.alpha();

				}

				return () => {
					editor.removeTool(tool)
				}
			}
		}
	}, [selectedTool, editor])

	useEffect(() => {
		const tool = tools.find(t => t.value === selectedTool)?.tool
		if (tool) {
			if (tool instanceof Brush) {

				const color = new Color(selectedColor);

				tool.color = color;
				tool.alpha = color.alpha();
			}
		}
	}, [selectedTool, selectedColor])

	useEffect(() => {
		if (editor) {
			const layer = layers.find(l => l.value === selectedLayer)?.layer;
			if (layer) {
				editor.setFocusedLayer(layer);
			}
		}
	}, [selectedLayer, editor])


	return (
		<Box>
			<WaveSplash>
				<Group noWrap>
					<Image src="https://github.com/2mer/PIXIL/blob/main/public/pixil_logox200.png?raw=true" width={200} />
					<Stack>
						<Title order={1}>PIXIL</Title>
						<Title order={3}>A TypeScript open-source hackable pixel editor powered by PIXI.js</Title>
					</Stack>
				</Group>
			</WaveSplash>

			<Group noWrap position='center'>
				{/* tools */}
				<SegmentedControl data={tools} value={selectedTool} onChange={setSelectedTool} orientation="vertical" />

				{/* canvas */}
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Box sx={{ width: '600px', height: '600px', borderRadius: '10px', overflow: 'hidden' }} ref={ref} />
				</Box>

				<Stack>

					{/* color picker */}
					<ColorPicker format="hsla" value={selectedColor} onChange={setSelectedColor} />
					{/* layers */}
					<SegmentedControl data={layers} value={selectedLayer} onChange={setSelectedLayer} orientation="vertical" />
				</Stack>
			</Group>

			<Box sx={{ padding: '20vh 30vw' }}></Box>
		</Box>

	)
}
