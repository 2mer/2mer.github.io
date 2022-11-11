import {
	ActionIcon,
	Box,
	Container,
	CopyButton,
	Group,
	Text,
	Tooltip,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { Check, Copy } from 'tabler-icons-react';

const email = 'kenyweb7+contact@gmail.com';

const MotionContainer = motion(Container);

function Contact() {
	return (
		<Box bg='blue.5' w='100%'>
			<MotionContainer
				size={700}
				bg='blue.5'
				p='md'
				style={{ minHeight: '200px' }}
				initial={{ opacity: 0, translateX: 50 }}
				whileInView={{ opacity: 1, translateX: 0 }}
			>
				<Text color='gray.9' fw={800} fz='40px'>
					Contact me
				</Text>
				<Group noWrap>
					<CopyButton value={email} timeout={2000}>
						{({ copied, copy }) => (
							<>
								<Text color='gray.9' size='xl' fw={800}>
									{email}
								</Text>
								<Tooltip
									label={copied ? 'Copied' : 'Copy'}
									withArrow
									position='right'
								>
									<Group noWrap>
										<ActionIcon
											color={copied ? 'teal' : 'gray.9'}
											onClick={copy}
											size='lg'
											// color='gray.9'
										>
											{copied ? (
												<Check size={24} />
											) : (
												<Copy size={24} />
											)}
										</ActionIcon>
									</Group>
								</Tooltip>
							</>
						)}
					</CopyButton>
				</Group>
			</MotionContainer>
		</Box>
	);
}

export default Contact;
