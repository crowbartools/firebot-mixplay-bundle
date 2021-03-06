import * as Mixer from '@mixer/cdk-std';

import { Label } from '../label/label';

@Mixer.Control({ kind: "viewerStat"})
export class ViewerStat extends Label {

  /**
   * The default text in the stat label.
   */
  @Mixer.Input() public defaultText: string;


  @Mixer.Input() public statDataField: string = '';

  /* Label Inputs */
  /**
   * The text size in the label.
   */
  @Mixer.Input() public textSize: string;

  /**
   * The text color of the label.
   */
  @Mixer.Input({ kind: Mixer.InputKind.Color })
  public textColor: string;

  /**
   * Is the text of the label underlined?
   */
  @Mixer.Input() public underline: boolean;

  /**
   * Is the text of the label bold?
   */
  @Mixer.Input() public bold: boolean;

  /**
   * Is the text of the label italics?
   */
  @Mixer.Input() public italic: boolean;

  /**
   * Justification of the label
   */
  @Mixer.Input({ kind: Mixer.InputKind.String }) public justification: "center" | "left" | "right" = "center";

  private getAndApplyStat = (participant: Mixer.IParticipant) => {
    if(participant == null || this.statDataField == null || this.statDataField === "") return;

    let statValue = participant[this.statDataField];

    this.text = statValue;
    this.forceUpdate();
  };

  public componentDidMount() {
    this.text = this.defaultText;
    this.control.state.participant.on('update', this.getAndApplyStat);
  }

  public componentWillReceiveProps() {
    this.getAndApplyStat(this.control.state.participant.props);
  }

  public componentWillUnmount() {
    this.control.state.participant.removeListener('update', this.getAndApplyStat);
  }
}
