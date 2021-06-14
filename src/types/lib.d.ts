declare module "list-to-tree" {
    interface Options {
        [key: string]: string;
    }

    class LTT<T> {
        constructor(array: T[], options: Options) {
            this.array = array;
            this.options = options;
        }

        GetTree(): (T & { child?: T[] })[];
    }

    export default LTT;
}

declare module "@ckeditor/ckeditor5-react" {
    const CKEditor: any;
    export { CKEditor };
}

declare module "@ckeditor/ckeditor5-build-classic" {
    const ClassicEditor: any;
    export = ClassicEditor;
}

declare module "react-stomp" {
    const StompClient: any;

    export default StompClient;
}
