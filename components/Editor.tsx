'use client';

import { locales } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from 'next-themes';
import { useEdgeStore } from '@/lib/edgestore';
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

interface EditorProps {
	onChange: (value: string) => void;
	initialContent?: string;
	editable?: boolean;
}

// Define Turkish translations
locales.tr = {
    addBlock: "Blok Ekle",
    deleteBlock: "Bloğu Sil",
    uploadFile: "Dosya Yükle",
    // Add other translation keys and values here
};

const Editor = ({
	onChange,
	initialContent,
	editable
}: EditorProps): React.ReactNode => {
	const { resolvedTheme } = useTheme();
	const { edgestore } = useEdgeStore();

	const handleUpload = async (file: File): Promise<string> => {
		const response = await edgestore.publicFiles.upload({ file });

		return response.url;
	};

	// Creates a new editor instance with Turkish localization.
	const editor: BlockNoteEditor = useCreateBlockNote({
		initialContent: initialContent
			? (JSON.parse(initialContent) as PartialBlock[])
			: undefined,
		uploadFile: handleUpload,
		dictionary: locales.tr, // Using the Turkish dictionary
	});

	return (
		<div>
			<BlockNoteView
				editable={editable}
				editor={editor}
				theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
				onChange={() => {
					onChange(JSON.stringify(editor.document, null, 2));
				}}
			/>
		</div>
	);
};

export default Editor;
