import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useRef, useState } from 'react';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

type Props = {
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const [draftState, setDraftState] =
		useState<ArticleStateType>(defaultArticleState);

	const toggleOpen = () => {
		setIsOpen((prev) => !prev);
	};

	const handleDraftChange = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setDraftState((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(draftState);
	};

	const handleReset = () => {
		setDraftState(defaultArticleState);
		onApply(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef: containerRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
				ref={containerRef}
				tabIndex={0}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={draftState.fontFamilyOption}
						onChange={(value) => handleDraftChange('fontFamilyOption', value)}
						title='Шрифт'
						placeholder='Выберите шрифт'
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={draftState.fontSizeOption}
						onChange={(value) => handleDraftChange('fontSizeOption', value)}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={draftState.fontColor}
						onChange={(value) => handleDraftChange('fontColor', value)}
						title='Цвет шрифта'
						placeholder='Выберите цвет'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={draftState.backgroundColor}
						onChange={(value) => handleDraftChange('backgroundColor', value)}
						title='Цвет фона'
						placeholder='Выберите фон'
					/>
					<Select
						options={contentWidthArr}
						selected={draftState.contentWidth}
						onChange={(value) => handleDraftChange('contentWidth', value)}
						title='Ширина контента'
						placeholder='Выберите ширину'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
