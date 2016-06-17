import { Pipe, PipeTransform } from '@angular/core';

import { Hero } from './hero';

/*
 * Show the alter ego if it has
 * Usage:
 *   hero | display-name
 * Example:
 *   {{ hero || displayName }}
 *   formats to: Batman (Bruce Wayne)
*/
@Pipe({
    name: 'displayName'
})

export class DisplayNamePipe implements PipeTransform {
    transform(value: Hero): any {
        let displayName = value.name;

        if (value.alter_ego) {
            displayName += ` (${value.alter_ego})`;
        }

        return displayName;
    }
}