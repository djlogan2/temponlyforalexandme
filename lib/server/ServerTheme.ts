import _ from "lodash";
import themes from "/imports/themes";
import { EThemesEnum } from "../records/ThemeRecord";
import CommonReadOnlyThemeDao from "/imports/dao/CommonReadOnlyThemeDao";
import WritableThemeDao from "/imports/server/dao/WritableThemeDao";
import Theme from "/lib/Theme";
import Stoppable from "../Stoppable";

// Why do we have this? Do you envision having this do something useful?
// When we eventually get to the point of uploading and downloading themes,
// the themeservice will handle all of that. But I can't figure out what
// the server would ever do internally with a theme. This is virtually 100%
// client only, as far as I know.
export default class ServerTheme extends Theme {
  private writablethemedao: WritableThemeDao;

  constructor(
    parent: Stoppable | null,
    themedao: CommonReadOnlyThemeDao,
    writabledao: WritableThemeDao,
  ) {
    super(parent, themedao);
    this.writablethemedao = writabledao;

    const themeKeys = Object.keys(EThemesEnum);

    themeKeys.forEach((theme) => {
      const selector = { "theme.type": theme };
      const currentTheme = this.themedao.readOne(selector);
      const selectedTheme: { [key in EThemesEnum]: typeof themes.DARK } =
        themes;

      if (!currentTheme || !_.isEqual(currentTheme, selectedTheme)) {
        this.writablethemedao.upsert(selector, {
          theme: selectedTheme[theme as EThemesEnum],
        });
      }
    });
  }

  protected stopping(): void {}
}
