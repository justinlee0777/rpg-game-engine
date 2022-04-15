import { CommandType } from '../../command.interface';
import { Priority } from '../../priority';
import { SkillType } from '../skill-type';
import { Skill } from '../skill.interface';

/**
 * TODO
 * A basic attack that every character possesses.
 * This is for prototype purposes. The more I think about it, the more
 * it seems counter to the design of the game.
 */
export class Attack implements Skill {
    displayName = 'Attack';
    description = 'A basic attack.';

    damage = 5;

    stamina = 5;

    priority = Priority.EAGER;


    type = CommandType.SKILL;
    skillType = SkillType.ATTACK;
}