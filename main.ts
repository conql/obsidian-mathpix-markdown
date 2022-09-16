import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { MathpixMarkdownModel } from 'mathpix-markdown-it';

// Remember to rename these classes and interfaces!

interface MathpixMdSettings {
	enable: boolean;
}

const DEFAULT_SETTINGS: MathpixMdSettings = {
	enable: true
}

export default class MyPlugin extends Plugin {
	settings: MathpixMdSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new MathpixMdSettingTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor("mmd", (source, el, ctx) => {
			if (source.trim() == "") {
				el.innerHTML = "<code>empty mmd block</code>";
			}
			else {
				let modified = source.replaceAll("!!!", "```");
				el.innerHTML = MathpixMarkdownModel.markdownToHTML(modified);
			}
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class MathpixMdSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Settings for Mathpix Markdown' });

		new Setting(containerEl)
			.setName('Enable Mathpix Markdown')
			.setDesc('Enable Mathpix Markdown')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.enable)
				.onChange(async (value) => {
					this.plugin.settings.enable = value;
					await this.plugin.saveSettings();
				}
				));
	}
}
