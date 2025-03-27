export class StringOperation {
    static getInitials(text: string | undefined): string | undefined {
        const textClearSpaces = text?.trim().replace(/\s+/g, ' ');
        const arrayWords = textClearSpaces?.split(/\s+/);
        let initials: string;

        if ((arrayWords?.length ?? 0) < 3) {
            initials = arrayWords?.map(word => word.charAt(0)).join('') ?? '';
        } else {
            initials = (arrayWords?.[0].charAt(0) ?? '') + (arrayWords?.[2].charAt(0) ?? '');
        }

        return initials.toUpperCase();
    }

    static getBase64() {
        return "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"
    }
}