import { Component,Input } from "@angular/core";
import { CommonModule } from "@angular/common";

export type  ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
    selector:'baba-button',
    standalone:true,
    imports:[CommonModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
})

export class ButtonComponent {
    @Input()  variant: ButtonVariant = 'primary';
    @Input()  size:ButtonSize= "md";
    @Input()  disabled = false;

    getButtonClasses(): string{
        return `btn-${this.variant} btn-${this.size}`;
    }
}