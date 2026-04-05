import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	filterTimeZones,
	getBrowserTimeZone,
	listIanaTimeZones,
	sortTimeZonesWithUtcFirst
} from '@site/src/utils/timezones';
import styles from '@site/src/components/docker-configurator/docker-configurator.module.css';

export function TimezoneField(props: {
	id: string;
	value: string;
	onChange: (tz: string) => void;
}): ReactNode {
	const zones = useMemo(() => listIanaTimeZones(), []);
	const [open, setOpen] = useState(false);
	const [q, setQ] = useState('');
	const comboRef = useRef<HTMLDivElement>(null);
	const searchInputRef = useRef<HTMLInputElement>(null);

	const filtered = useMemo(() => filterTimeZones(zones, q), [zones, q]);
	const options = useMemo(() => {
		const set = new Set(filtered);
		if (props.value.trim() && !set.has(props.value)) set.add(props.value);
		return sortTimeZonesWithUtcFirst([...set]);
	}, [filtered, props.value]);

	const pick = useCallback(
		(tz: string) => {
			props.onChange(tz);
			setQ('');
			setOpen(false);
		},
		[props.onChange]
	);

	useEffect(() => {
		if (!open) return;
		const t = window.setTimeout(() => searchInputRef.current?.focus(), 0);
		return () => window.clearTimeout(t);
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onDoc = (e: MouseEvent) => {
			if (comboRef.current && !comboRef.current.contains(e.target as Node)) setOpen(false);
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false);
		};
		document.addEventListener('mousedown', onDoc);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('mousedown', onDoc);
			document.removeEventListener('keydown', onKey);
		};
	}, [open]);

	const display = props.value.trim() ? props.value : 'Select a timezone…';

	return (
		<div className={styles.fieldRow}>
			<label id={`${props.id}-label`} className={styles.fieldRowLabel} htmlFor={`${props.id}-trigger`}>
				Timezone
			</label>
			<div className={styles.fieldRowControl}>
				<div ref={comboRef} className={styles.tzCombo}>
					<button
						id={`${props.id}-trigger`}
						type="button"
						className={styles.tzComboTrigger}
						aria-expanded={open}
						aria-haspopup="listbox"
						aria-controls={`${props.id}-listbox`}
						aria-labelledby={`${props.id}-label`}
						onClick={() => setOpen((v) => !v)}
					>
						<span className={styles.tzComboValue}>{display}</span>
						<span className={styles.tzComboChevron} aria-hidden>
							▼
						</span>
					</button>
					{open && (
						<div className={styles.tzComboPanel} role="presentation">
							<input
								ref={searchInputRef}
								type="search"
								className={styles.tzComboSearch}
								placeholder="Search IANA zones…"
								value={q}
								onChange={(e) => setQ(e.target.value)}
								autoComplete="off"
								aria-label="Filter timezones"
								onKeyDown={(e) => {
									e.stopPropagation();
								}}
							/>
							<ul
								id={`${props.id}-listbox`}
								className={styles.tzComboList}
								role="listbox"
								aria-label="Timezones"
							>
								{options.map((z) => (
									<li
										key={z}
										className={clsx(styles.tzComboOption, props.value === z && styles.tzComboOptionSelected)}
										role="option"
										aria-selected={props.value === z}
										onMouseDown={(e) => e.preventDefault()}
										onClick={() => pick(z)}
									>
										{z}
									</li>
								))}
							</ul>
							<div className={styles.tzComboFooter}>
								<button
									type="button"
									className={clsx('button button--secondary button--sm', styles.tzComboFooterBtn)}
									onMouseDown={(e) => e.preventDefault()}
									onClick={() => pick(getBrowserTimeZone())}
								>
									Use browser timezone
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
