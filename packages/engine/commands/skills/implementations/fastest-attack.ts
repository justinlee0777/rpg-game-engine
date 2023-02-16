import { CommandType } from '../../command.interface';
import { Priority } from '../../priority';
import { SkillType } from '../skill-type';
import { Skill } from '../skill.interface';

/**
 * TODO
 */
export class FastestAttack implements Skill {
    damage = 5;

    stamina = 15;

    priority = Priority.IMMEDIATE;

    type = CommandType.SKILL;
    skillType = SkillType.FASTEST_ATTACK;
}
