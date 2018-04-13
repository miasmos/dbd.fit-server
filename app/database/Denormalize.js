export class Denormalize {
    static build({
        name,
        perkOneTier,
        perkTwoTier,
        perkThreeTier,
        perkFourTier,
        offering,
        perkOne,
        perkTwo,
        perkThree,
        perkFour,
        player,
        addonOne,
        addonTwo,
        power,
        type
    }) {
        return {
            name,
            player,
            type,
            power: !!power ? power : undefined,
            perks: [
                !!perkOne ? perkOne : undefined,
                !!perkTwo ? perkTwo : undefined,
                !!perkThree ? perkThree : undefined,
                !!perkFour ? perkFour : undefined
            ],
            tiers: [
                !!perkOneTier ? perkOneTier : undefined,
                !!perkTwoTier ? perkTwoTier : undefined,
                !!perkThreeTier ? perkThreeTier : undefined,
                !!perkFourTier ? perkFourTier : undefined
            ],
            addons: [
                !!addonOne ? addonOne : undefined,
                !!addonTwo ? addonTwo : undefined
            ],
            offering: !!offering ? offering : undefined
        };
    }
}
