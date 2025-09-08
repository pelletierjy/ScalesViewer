import { BasicNavigation } from '../common/BasicNavigation';
import { WaitForLoad } from '../../interactions/Navigate';

/**
 * Navigate to the piano page
 * Simplified implementation to avoid SerenityJS Task API issues
 */
export class NavigateToPianoPage {
    static asExpert() {
        return NavigateToPianoPage.asUserType('expert');
    }

    static asRegularUser() {
        return NavigateToPianoPage.asUserType('standard');
    }

    static asUserType(userType: 'expert' | 'standard') {
        const tasks = [
            BasicNavigation.toPianoPage(),
            WaitForLoad.toComplete()
        ];

        if (userType === 'expert') {
            console.log('Setting up piano page for expert user');
        }

        return tasks;
    }
}