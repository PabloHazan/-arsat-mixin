import { InjectionError, mixin } from "../src";

class Player {
  constructor(public name: string, public gameName: string) {}

  sayHello() {
    return `Hello, I'm ${this.name}, a player`;
  }

  play() {
    return `${this.name} is playing ${this.gameName}`;
  }

  set favoriteGame(gameName: string) {
    this.gameName = gameName;
  }

  set fullData(nameAndGame: string) {
    const [name, gameName] = nameAndGame.split("/");
    this.name = name;
    this.gameName = gameName;
  }

  get favoriteGame(): string {
    return `My favorite game is ${this.gameName}`;
  }

  get cv(): string {
    return `${this.name} is a player of ${this.gameName}`;
  }
}

class Student {
  constructor(public name: string, public subjectName: string) {}

  sayHello() {
    return `Hello, I'm ${this.name}, a student`;
  }

  study() {
    return `${this.name} is studying ${this.subjectName}`;
  }

  set favoriteSubjet(subjectName: string) {
    this.subjectName = subjectName;
  }

  set fullData(subjectAndName: string) {
    const [subjectName, name] = subjectAndName.split("/");
    this.subjectName = subjectName;
    this.name = name;
  }

  get favoriteSubjet(): string {
    return `My favorite subject is ${this.subjectName}`;
  }

  get cv(): string {
    return `${this.name} is a student of ${this.subjectName}`;
  }
}

describe("mixin", () => {
  describe("success cases", () => {
    class StudentAndPlayer extends Student {
      constructor(name: string, subjectName: string, gameName: string) {
        super(name, subjectName);
        const player = new Player(name, gameName);
        mixin(this, player);
      }

      get fullInfo(): string {
        return `Name: ${this.name}, Subject: ${this.subjectName}, Game: ${this.gameName}`;
      }
    }
    interface StudentAndPlayer extends Player {}

    let studentAndPlayer: StudentAndPlayer;
    beforeEach(() => {
      studentAndPlayer = new StudentAndPlayer("Alice", "Math", "Chess");
    });

    it("should mixin the properties of the delegate class", () => {
      expect(studentAndPlayer.name).toBe("Alice");
      expect(studentAndPlayer.subjectName).toBe("Math");
      expect(studentAndPlayer.gameName).toBe("Chess");
    });

    it("should mix the methods of the delegate class", () => {
      expect(studentAndPlayer.study()).toBe("Alice is studying Math");
      expect(studentAndPlayer.play()).toBe("Alice is playing Chess");
    });

    it("repeated methods take the value from the original class", () => {
      expect(studentAndPlayer.sayHello()).toBe("Hello, I'm Alice, a student");
    });

    it("should mix the getters of the delegate class", () => {
      expect(studentAndPlayer.favoriteSubjet).toBe(
        "My favorite subject is Math"
      );
      expect(studentAndPlayer.favoriteGame).toBe("My favorite game is Chess");
      expect(studentAndPlayer.fullInfo).toBe(
        "Name: Alice, Subject: Math, Game: Chess"
      );
    });

    it("repeated getters take the value from the original class", () => {
      expect(studentAndPlayer.cv).toBe("Alice is a student of Math");
    });

    it("should mix the setters of the delegate class", () => {
      expect(studentAndPlayer.subjectName).toBe("Math");
      expect(studentAndPlayer.gameName).toBe("Chess");
      studentAndPlayer.favoriteSubjet = "Physics";
      studentAndPlayer.favoriteGame = "Tennis";
      expect(studentAndPlayer.subjectName).toBe("Physics");
      expect(studentAndPlayer.gameName).toBe("Tennis");
    });

    it("repeated setters take the value from the original class", () => {
      expect(studentAndPlayer.name).toBe("Alice");
      expect(studentAndPlayer.subjectName).toBe("Math");
      expect(studentAndPlayer.gameName).toBe("Chess");
      studentAndPlayer.fullData = "Physics/Richard";
      expect(studentAndPlayer.name).toBe("Richard");
      expect(studentAndPlayer.subjectName).toBe("Physics");
      expect(studentAndPlayer.gameName).toBe("Chess");
    });
  });

  describe("error cases", () => {
    class SubPlayer extends Player {
      constructor(name: string, gameName: string, public level: number) {
        super(name, gameName);
      }
    }

    let player: Player;
    let subPlayer: SubPlayer;

    beforeEach(() => {
      player = new Player("Alice", "Chess");
      subPlayer = new SubPlayer("Alice", "Chess", 10);
    });

    it("Mixin of a child class throws an error", () => {
      expect(() => mixin(player, subPlayer)).toThrow(InjectionError);
    });
    it("Mixin of a parent class throws an error", () => {
      expect(() => mixin(subPlayer, player)).toThrow(InjectionError);
    });
  });
});
