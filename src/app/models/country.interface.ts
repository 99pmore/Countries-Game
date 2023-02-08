export interface Country {
    name:  Name
    flags: Flags
}

export interface Flags {
    svg: string
    alt: string
}

export interface Name {
    common:     string
}