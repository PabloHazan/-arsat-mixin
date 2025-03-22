# Mixin

## Description

`Mixin` is a TypeScript library that facilitates the creation and management of mixins in your projects. Mixins allow you to combine behaviors and properties from multiple classes into one, promoting code reuse and modularity. This library is designed to be easy to use and highly extensible, providing an intuitive API for defining and applying mixins to your classes.

### Key Features:

- **Class Composition**: Combine multiple classes into one using mixins.
- **Code Reuse**: Promote the reuse of common behaviors and properties.
- **Extensible**: Easy to extend and customize according to your project's needs.
- **TypeScript Compatibility**: Fully typed to leverage the benefits of TypeScript.

This library is ideal for developers looking for an efficient way to manage multiple inheritance and class composition in their applications.

## Installation

You can install the `Mixin` library using npm or yarn.

### Using npm

```sh
npm install @arsat/mixin
```

### Using npm

```sh
yarn add @arsat/mixin
```

## Usage

### Basic Example

Here's a basic example of how to use the `Mixin` library to combine multiple classes:

```typescript
import { mixin } from "@arsat/mixin";

// Define some base classes
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

  get favoriteGame(): string {
    return `My favorite game is ${this.gameName}`;
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

  set favoriteSubject(subjectName: string) {
    this.subjectName = subjectName;
  }

  get favoriteSubject(): string {
    return `My favorite subject is ${this.subjectName}`;
  }
}

// Create a new class that combines both behaviors
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

// Define an interface that extends Player
interface StudentAndPlayer extends Player {}

const studentAndPlayer = new StudentAndPlayer("Alice", "Math", "Chess");
console.log(studentAndPlayer.sayHello()); // Output: Hello, I'm Alice, a student
console.log(studentAndPlayer.study()); // Output: Alice is studying Math
console.log(studentAndPlayer.play()); // Output: Alice is playing Chess
console.log(studentAndPlayer.favoriteSubject); // Output: My favorite subject is Math
console.log(studentAndPlayer.favoriteGame); // Output: My favorite game is Chess
console.log(studentAndPlayer.fullInfo); // Output: Name: Alice, Subject: Math, Game: Chess
```

### Notes

-The mixin function takes an instance of the target class and an instance of the delegate class, and mixes the properties, methods, getters and setters of the delegate class into the target class.

- Ensure that the classes you are combining do not have conflicting method names properties, getters or setters to avoid unexpected behavior.
- Repeated methods, properties, getters and setters will take the value from the original class unless overridden.

These examples should help you get started with the Mixin library and demonstrate how to effectively combine multiple classes in your TypeScript projects.
