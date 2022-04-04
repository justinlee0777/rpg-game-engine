/**
 * A semantic scale for Priority.
 * Need to think how this system gets resolved. Likely if two actions compete, the ordering of players will kick in,
 * with enemies resolved last.
 */
export enum Priority {
    SLOW,
    DELIBERATIVE,
    EAGER,
    QUICK,
    IMMEDIATE,
}