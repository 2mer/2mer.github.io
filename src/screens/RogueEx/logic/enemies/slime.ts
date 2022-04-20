import livingBase from "../livingBase";

const slime = ({ health, name = 'slime', splitDivisions = 2, splitsRemaining = 1 }) => {
	const base = livingBase();

	return ({
		...base,
		originalHealth: health,
		health,
		name,
		properties: [
			{
				name: 'split divisions',
				value: splitDivisions,
				sightRequired: 0,
			},
			{
				name: 'splits remaining',
				value: splitsRemaining,
				sightRequired: 0,
			}
		],
		onDeath: function onDeath(encounterDraft) {

			if (splitsRemaining) {

				const splitSize = Math.floor(this.originalHealth.length / splitDivisions);
				const remainder = this.originalHealth.length % splitDivisions;

				let splitOffset = 0;
				for (let i = 0; i < splitDivisions; i++) {

					const healthSize = i === 0 ? splitSize + remainder : splitSize;
					const splitHealth = this.originalHealth.substr(splitOffset, healthSize);
					splitOffset += healthSize;

					encounterDraft.enemies.push(slime({ health: splitHealth, splitsRemaining: splitsRemaining - 1 }));
				}

				console.log(`🪓 ${name} has split into %o`, splitDivisions);

			} else {
				base.onDeath.call(this);
			}

		}
	})
}

export default slime;