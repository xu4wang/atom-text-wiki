'use babel';

import AtomTextWikiView from './atom-text-wiki-view';
import { CompositeDisposable } from 'atom';

export default {

  atomTextWikiView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomTextWikiView = new AtomTextWikiView(state.atomTextWikiViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomTextWikiView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-text-wiki:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomTextWikiView.destroy();
  },

  serialize() {
    return {
      atomTextWikiViewState: this.atomTextWikiView.serialize()
    };
  },

  toggle() {
    console.log('AtomTextWiki was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
