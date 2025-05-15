import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

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
} from 'src/constants/articleProps';

import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

type Props = {
	articleState: ArticleStateType;
	onChange: (key: keyof ArticleStateType, value: OptionType) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	articleState,
	onChange,
	onApply,
	onReset,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const toggleOpen = () => {
		setIsOpen((prev) => !prev);
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
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						onApply();
					}}>
					<Select
						options={fontFamilyOptions}
						selected={articleState.fontFamilyOption}
						onChange={(value) => onChange('fontFamilyOption', value)}
						title='Шрифт'
						placeholder='Выберите шрифт'
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						onChange={(value) => onChange('fontSizeOption', value)}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={articleState.fontColor}
						onChange={(value) => onChange('fontColor', value)}
						title='Цвет текста'
						placeholder='Выберите цвет'
					/>
					<Select
						options={backgroundColors}
						selected={articleState.backgroundColor}
						onChange={(value) => onChange('backgroundColor', value)}
						title='Фон'
						placeholder='Выберите фон'
					/>
					<Select
						options={contentWidthArr}
						selected={articleState.contentWidth}
						onChange={(value) => onChange('contentWidth', value)}
						title='Ширина контента'
						placeholder='Выберите ширину'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={onApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
