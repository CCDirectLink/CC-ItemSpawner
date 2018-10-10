import { UICategory } from './uiCategory.js'
import { Item } from '../model/item.js'

export const Categories : Array<UICategory> = [
    new UICategory('All', '/assets/mods/itemSpawner/img/ic-all.png'),
    new UICategory('Consumables', '/assets/mods/itemSpawner/img/ic-consumable.png',
        <Item>{ type: "CONS" }),
    new UICategory('Arms', '/assets/mods/itemSpawner/img/ic-arm.png',
        <Item>{ type: "EQUIP", equipType: "ARM" }),
    new UICategory('Head', '/assets/mods/itemSpawner/img/ic-head.png',
        <Item>{ type: "EQUIP", equipType: "HEAD" }),
    new UICategory('Torso', '/assets/mods/itemSpawner/img/ic-torso.png',
        <Item>{ type: "EQUIP", equipType: "TORSO" }),
    new UICategory('Legs', '/assets/mods/itemSpawner/img/ic-legs.png',
        <Item>{ type: "EQUIP", equipType: "FEET" }),
    new UICategory('Trade', '/assets/mods/itemSpawner/img/ic-trade.png',
        <Item>{ type: "TRADE" }),
    new UICategory('Valuables', '/assets/mods/itemSpawner/img/ic-valuables.png',
        <Item>{ type: "KEY" })
]