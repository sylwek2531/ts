export interface IInput {
    type: string,
    name: string,
    generate(): HTMLInputElement,
    addEvents(): void
}