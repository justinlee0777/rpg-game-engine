import { CommandType } from '../../command.interface';
import { Priority } from '../../priority';
import { SkillType } from '../skill-type';
import { Skill } from '../skill.interface';

/**
 * TODO
 */
export class FastestAttack implements Skill {
    displayName = 'Fastest Attack';
    description = 'A basic fastest attack.';

    damage = 5;

    stamina = 15;

    priority = Priority.IMMEDIATE;

    type = CommandType.SKILL;
    skillType = SkillType.FASTEST_ATTACK;
}