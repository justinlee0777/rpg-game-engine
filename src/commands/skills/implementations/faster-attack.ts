import { CommandType } from '../../command.interface';
import { Priority } from '../../priority';
import { SkillType } from '../skill-type';
import { Skill } from '../skill.interface';

/**
 * TODO
 */
export class FasterAttack implements Skill {
    damage = 5;

    stamina = 10;

    priority = Priority.QUICK;

    type = CommandType.SKILL;
    skillType = SkillType.FASTER_ATTACK;
}
