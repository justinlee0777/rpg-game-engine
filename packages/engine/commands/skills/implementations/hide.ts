import { CommandType } from '../../command.interface';
import { OngoingEffectTriggerType, OngoingEffectType } from '../../../ongoing-effects';
import { Priority } from '../../priority';
import { SkillType } from '../skill-type';
import { Skill } from '../skill.interface';

export class Hide implements Skill {
    stamina = 5;

    /** TODO: for now IMMEDIATE for testing */
    priority = Priority.IMMEDIATE;

    ongoingEffects = [
        {
            type: OngoingEffectType.HIDE,
            turnDuration: 1,
            trigger: {
                type: OngoingEffectTriggerType.IMMEDIATE,
            },
        },
    ];

    skillType = SkillType.HIDE;

    type = CommandType.SKILL;
}