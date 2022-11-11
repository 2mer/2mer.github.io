import { Popover, Table, Text, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'preact/hooks';
import { AlphabetLatin } from 'tabler-icons-react';

function CaretComplete({ texts, intervalMS = 5_000 }) {
	const [index, setIndex] = useState(0);
	const theme = useMantineTheme();
	const [completed, setCompleted] = useState(false);

	useEffect(() => {
		if (!completed) {
			const interval = setInterval(() => {
				setIndex((prev) => (prev + 1 < texts.length ? prev + 1 : 0));
			}, intervalMS);

			return () => {
				clearInterval(interval);
			};
		}
	}, [completed]);

	return (
		<>
			<Popover opened={!completed} position='bottom-start' radius={0}>
				<Popover.Target>
					{completed ? (
						<span />
					) : (
						<div
							className='caret'
							style={{ background: theme.colors.blue[3] }}
						/>
					)}
				</Popover.Target>
				<Popover.Dropdown p={0}>
					<Table highlightOnHover withBorder>
						<tbody>
							{texts.map((text, i) => {
								const isSelected = i === index;

								return (
									<tr
										onClick={() => {
											setIndex(i);
											setCompleted(true);
										}}
										style={
											isSelected
												? {
														background:
															theme.colors
																.blue[5],
														color: 'white',
												  }
												: undefined
										}
									>
										<td style={{ padding: '2px 6px' }}>
											<AlphabetLatin
												size={16}
												style={{ display: 'flex' }}
											/>
										</td>
										<td
											style={{
												fontFamily: 'monospace',
												padding: '2px 6px',
												minWidth: '220px',
												fontSize: '16px',
											}}
										>
											{text}
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</Popover.Dropdown>
			</Popover>
			<Text
				inherit
				style={completed ? undefined : { opacity: 0.2 }}
				component='span'
			>
				{texts[index]}
			</Text>
		</>
	);
}

export default CaretComplete;
