import { Navigate } from '../../interactions/Navigate';
import { WaitForLoad } from '../../interactions/Navigate';

/**
 * Basic navigation tasks for all users
 * Simplified implementation to avoid SerenityJS Task API issues
 */
export class BasicNavigation {
    static toHomePage() {
        return BasicNavigation.to('home');
    }

    static toGuitarPage() {
        return BasicNavigation.to('guitar');
    }

    static toPianoPage() {
        return BasicNavigation.to('piano');
    }

    static toInstrumentPage(instrument: string) {
        return BasicNavigation.to(instrument);
    }

    static to(destination: string) {
        const baseUrl = 'http://localhost:3000';
        let url: string;

        switch (destination) {
            case 'home':
                url = baseUrl;
                break;
            case 'guitar':
                url = `${baseUrl}/guitar`;
                break;
            case 'piano':
                url = `${baseUrl}/piano`;
                break;
            case 'kalimba':
                url = `${baseUrl}/kalimba`;
                break;
            case 'harmonica':
                url = `${baseUrl}/harmonica`;
                break;
            default:
                url = `${baseUrl}/${destination}`;
        }

        return [
            Navigate.to(url),
            WaitForLoad.toComplete()
        ];
    }
}