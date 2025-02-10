export interface Account {
    email: string
    isPassport: boolean
    login: string
    name: string
    pass: string
    phone: string
    uid: number
}

export interface Agreement {
    agrmid: number
    balance: number
    credit: number
    date: string
    number: string
    operid: number
    vgroups: number
}

export interface RateModifier {
    type: string,
    value: number
}

export interface VgroupAddress {
    address: string
    code: string
    type: number
}

export interface Vgroup {
    agentdescr: string
    blocked: number
    currentmodifier: RateModifier
    curshape: number
    login: string
    servicerent: number
    tarifdescr: string
    vgid: number
}

export interface BackendResponse {
    account: Account,
    agreements: Agreement,
    vgroups: {vgroup: Vgroup, addresses: VgroupAddress[]}
}