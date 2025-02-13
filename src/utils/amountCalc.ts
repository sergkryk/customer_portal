import { Vgroup } from "@/types/types";

export function getAmountWithRate(vgroup: Vgroup): number {
    if (vgroup.currentmodifier.type === 'rate' && vgroup.currentmodifier.value < 1) {
        return Number(vgroup.servicerent) * Number(vgroup.currentmodifier.value)
    } else {
        return Number(vgroup.servicerent);
    }
}

export function getPersonalDiscountRate(vgroup: Vgroup): number {
    if (vgroup.currentmodifier.type === 'rate' && vgroup.currentmodifier.value < 1) {
        return 100 - (vgroup.currentmodifier.value * 100)
    } else {
        return 0
    }
}