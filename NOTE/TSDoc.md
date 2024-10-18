### @alpha

����ĺ���
ָ�� API ��ķ����׶�Ϊ `alpha`����ּ�ڹ� ������������Ա������δ�������ù��߿��Դ� ����������

��

```typescript
/**
 * ��ʾĿ¼�е�һ���顣
 * @public
 * */
export class Book {
    /**
     * ��ı��⡣
     * @alpha
     * */
    public get title(): string;
    
    /**
     * ������ߡ�
     * */
    public get author(): string;
}
```

�ڴ�ʾ���У��Ӱ����� while �����Ϊ ��alpha����`Book.author` `@public` `Book.title`

### @beta

����ĺ���
ָ�� API ��Ŀ�ķ����׶�Ϊ `beta`��������ʵ�鷽ʽ�������������Ա���� �����ռ�������API ��Ӧ����������ʹ�ã���Ϊ���ĺ�Լ���ܻ�
���и��ģ�ˡ������֪ͨ���ù��߿��Դӹ����汾���޼������������Խ�������� ������ԱԤ���档

��

```typescript
/**
 * ��ʾĿ¼�е�һ���顣
 * @public
 * */
export class Book {
    /**
     * ��ı��⡣
     * @beta
     * */
    public get title(): string;
    
    /**
     * ������ߡ�
     * */
    public get author(): string;
}
```

�ڴ�ʾ���У��Ӱ����� while �����Ϊ ��beta����Book.author@publicBook.title

### @category

�� ����ҳ��������С����Զ��ָ�������ڶ�� ���⡣`@category`

��

```typescript
/**
 * @category General Use
 */
export function runProcess(): void;

/**
 * @category Advanced Use
 */
export function unref(): void;

/**
 * @category Advanced Use
 */
export function ref(): void;
```

�����Զ���
����ʹ�� ѡ������ӵ��������С������ͨ��ָ�� �� modifier ����е�
�Ը������ע�͡�`navigation.includeCategories` `@showCategories` `@hideCategories`

### @categoryDescription

�ñ�ǩ�������ṩ�йط����������������� ����ʹ�� @category ��ǩ�����ġ�@categoryDescription

�ñ�ǩӦ�����ڰ��������ע���� ���� ���ӷ��䡣@categoryDescription@category

�ĵ�һ�н���Ϊ������ƣ��������ļ��н� ����������@categoryDescription

��

```typescript
/**
 * @categoryDescription Advanced Use
 * These functions are available for...
 * @module
 */

/**
 * @category General Use
 */
export function runProcess(): void;

/**
 * @category Advanced Use
 */
export function unref(): void;

/**
 * @category Advanced Use
 */
export function ref(): void;
```

### @decorator

�÷�
ECMAScript װ������ʱ��һ����Ҫ�Ĳ��� API Э���С����ǣ�Ŀǰ TypeScript �������� .d.ts ����ļ��в���ʾװ���� �� API
ʹ����ʹ�á��ñ�ǩ�ṩ��һ�ֽ����������������װ�������ʽ ���ĵ������С�@decorator

��

```typescript
class Book {
    /**
     * ��ı��⡣
     * @decorator `@jsonSerialized`
     * @decorator `@jsonFormat(JsonFormats.Url)`
     * */
    @jsonSerialized
    @jsonFormat(JsonFormats.Url)
    public website: string;
}
```

### @deprecated

�÷�
�˿��ǩ��ʾ API ��Ŀ������֧�֣����ҿ��ܻ���δ���汾��ɾ���� �ñ�ǩ���һ�������Ƽ���������ľ��ӡ����Եݹ鷽ʽӦ��
��ӵ������ĳ�Ա�����磬���ĳ���������ã��������г�ԱҲ�����á�@deprecated

��

```typescript
/**
 * ���Գ��ֵĿؼ��Ļ��ࡣ
 *
 * @deprecated ʹ���µĻ��� {@link Control} ����.
 * */
export class VisualControl {
}
```

### @defaultvalue

�÷�
���δ��ȷ����ֵ����˿������ڼ�¼�ֶλ����Ե�Ĭ��ֵ��

�˱��ֻ�������� TypeScript �� .`class` `interface`

��

```typescript
enum WarningStyle {
    DialogBox,
    StatusMessage,
    LogOnly
}


interface IWarningOptions {
    /**
     * ȷ�������ʾ���档
     *
     * @remarks
     * ������μ� {@link WarningStyle| the WarningStyle enum}.
     *
     * @defaultValue `WarningStyle.DialogBox`
     * */
    warningStyle?: WarningStyle;
    
    /**
     * �����Ƿ���ж��û���ǰ�Ļ��
     * @defaultValue
     * Ĭ��δ `true ` ���� `WarningStyle.StatusMessage` ��ָ��.
     * */
    cancellable?: boolean;
    
    /**
     * ������Ϣ
     * */
    message: string;
}
```

### @enum

��������ھ����ַ�������������ֵ�Ķ����ϣ�TypeDoc �Ὣ����ת��Ϊ ö�ٶ����Ǳ�����

��

```typescript
/**
 * This will be displayed as an enumeration.
 * @enum
 */
export const MyEnum = {
        /**
         * Doc comments may be included here.
         */
        A: "a",
        B: "b"
    } as const;

/**
 * This works too, but is more verbose
 * @enum
 */
export const MyEnum2: { A: "a" } = { A: "a" };

/**
 * So does this, for declaration files
 */
export declare const MyEnum3: { A: "a" };
```

### @event

�ñ�ǩ���ڽ���Ӱ���Ϊ���� ��Events�� �顣 ����Ч����ע����ָ����`@event` `@group` `Events`

��

```typescript
export class App extends EventEmitter {
    /**
     * @event
     */
    static ON_REQUEST = "request";
}
```

### @eventProperty

�ñ�ǩ���ڽ���Ӱ���Ϊ���� ��Events�� �顣 ����Ч����ע����ָ����`@eventProperty` `@group` `Events`

��

```typescript
export class App extends EventEmitter {
    /**
     * @eventProperty
     */
    static ON_REQUEST = "request";
}
```

### @eventProperty

�÷�
��Ӧ�������ӿ�����ʱ�����ʾ������ �����¼����������Ը��ӵ����¼������¼����� API ��ʵ�ֶ���ģ���ͨ�����Է�������Ϊ��
�滻Ϊ �� �ȳ�Ա���ĵ����߿��� �� ��Events�� ��������ʾ�������ԣ�������ͨ���� ��Properties�� ���⡣addHandler()removeHandler()

��

```typescript
class MyClass {
    /**
     * ÿ��Ӧ�ó��򵼺�����ҳ��ʱ�����ᴥ�����¼���
     * @eventProperty
     * */
    public readonly navigatedEvent: FrameworkEvent<NavigatedEventArgs>;
}
```

### @example

�÷�
ָʾӦ��Ϊʾ����ʾ���ĵ����֣���˵�����ʹ�� API�� �����ܰ�������ʾ����

Ӧ�������ǩ������ͬһ�е��κκ����ı� ��Ϊʾ���ı��⡣�����ĵ����߿��԰����ַ�ʽΪʾ������������`@example`

ʾ�� A
���ڴ˴���ʾ�������ɵı�������ǡ�Example���͡�Example 2����

```typescript
/**
 * �������
 * @example
 * ����һ���򵥵�ʾ��:
 *
 * // Prints "2":
 * console.log(add(1,1));
 *
 * @example
 * ����һ����������:
 *
 * // Prints "0":
 * console.log(add(1,-1));
 *
 * */
export function add(x: number, y: number): number {
}
```

ʾ�� B
���ڴ˴���ʾ�������ɵı�������ǡ�ʾ������������ JSON �ļ�����

```typescript
/**
 * ����Json�ļ�.
 *
 * @param path - �ļ�����·��.
 * @returns ����Json���ݵĶ���.
 *
 * @example �������� JSON �ļ�
 *
 * # `file.json`������
 * ```json
 * {
 *   "exampleItem": "text"
 * }
 * \```
 *
 * # �÷�
 * ```ts
 * const result = parseFile("file.json");
 * \```
 *
 * # ���
 * ```ts
 * {
 *   exampleItem: 'text',
 * }
 * \```
 * */
```

### @experimental

����ĺ���
������ ��ͬ�����ɲ�֧�ַ����׶εĹ���ʹ�á�@beta@alpha

��

```typescript
/**
 * ��ʾĿ¼�е�һ���顣
 * @public
 * */
export class Book {
    /**
     * ��ı��⡣
     * @experimental
     * */
    public get title(): string;
    
    /**
     * ������ߡ�
     * */
    public get author(): string;
}
```

�ڴ�ʾ���У��Ӱ����� �����Ϊ `ʵ����`��`Book.author` `@public` `Book.title`

### @group

�� ����ҳ��������С����Զ��ָ�������ڶ�� ���⡣`@group`

�� `@category` ��ǩ��ͬ�����佫�Զ������� ������ kind �� Header�����δָ����ǣ����˱�ǩ������ ģ���Զ���˼����͡�`@group`

��

```typescript
export class App extends EventEmitter {
    /**
     * @group Events
     */
    static readonly BEGIN = "begin";
    
    /**
     * The `@event` tag is equivalent to `@group Events`
     * @event
     */
    static readonly PARSE_OPTIONS = "parseOptions";
    
    /**
     * The `@eventProperty` tag is equivalent to `@group Events`
     * @eventProperty
     */
    static readonly END = "end";
}
```

�����Զ���
����ʹ�� option ������ӵ��������С������ͨ��ָ�� �� modifier ����е�
�Ը������ע�͡�`navigation.includeGroups` `@showGroups` `@hideGroups`

### @groupDescription

�ñ�ǩ�������ṩ�й�һ�鷴������������ġ� TypeDoc ���ݷ���� TypeScript �����Զ��Է�����з��飬���Զ��������
ʹ�� `@group` ��Ǵ�����`@groupDescription`

�ñ�ǩӦ�����ڰ��������ע���� �ӷ����顣`@groupDescription`

�ĵ�һ�н���Ϊ�����ƣ��������ļ��н� ����������`@groupDescription`

��

```typescript
/**
 * @groupDescription Events
 * Events are for...
 */
export class App extends EventEmitter {
    /**
     * @group Events
     */
    static readonly BEGIN = "begin";
    
    /**
     * The `@event` tag is equivalent to `@group Events`
     * @event
     */
    static readonly PARSE_OPTIONS = "parseOptions";
    
    /**
     * The `@eventProperty` tag is equivalent to `@group Events`
     * @eventProperty
     */
    static readonly END = "end";
}
```

### @hidden

���иñ�ǩ�ķ��佫���ĵ���ɾ���� ���൱�� JSDoc ��ǩ��Ҳ�� TypeDoc ʶ��`@hidden` `@ignore`

��

```typescript
export class Visibility {
    /** @hidden */
    newBehavior(): void;
}
```

### @hideconstructor

�˱�ǩֻ�����ڽ�� TypeScript#58653�� ����� `@hidden` �� `@ignore` ��ǩ��

���Ϊ ���ཫ�����乹�캯������Ҳ���Է����ڹ��캯������ ���ĵ���ɾ������`@hideconstructor`

��

```typescript
/** @hideconstructor */
export class Visibility {
    /** Will not be present in the generated documentation */
    constructor() {
    }
}
```

### @ignore

���иñ�ǩ�ķ��佫���ĵ���ɾ���� ����Ч�� JSDoc ��ǡ�`@hidden@ignore`

��

```typescript
export class Visibility {
    /** @ignore */
    newBehavior(): void;
}
```

### @interface

������������ͱ����ϣ�����������ת��Ϊ�ӿڡ��⽫�������� ��dynamic�� ���� ��չ����������

��

```typescript
/**
 * This will be displayed as an interface
 * @property a comment for a
 * @prop b comment for b
 * @interface
 */
export type Resolved = Record<"a" | "b" | "c", string>;


// will be documented as if you wrote

/** This will be displayed as an interface */
export interface Resolved {
    /** comment for a */
    a: string;
    /** comment for b */
    b: string;
    c: string;
}
```

### @inheritDoc

�÷�
��������ǩ����ͨ������һ�� API ��Ŀ���� API ��Ŀ���ĵ����Զ����� API ��Ŀ���ĵ� API �inline tag
������������һ����Ŀ�����ã�����Ŀ������һ������ص��� �����Ǵӵ����� NPM �����롣

> [!NOTE]
> �������õķ�����δ����ȷ��������� GitHub ���� #9

���Ƶ�����
�ñ�ǩ���Ḵ�������������ġ����������������`@inheritDoc`

* ժҪ����
* @remarks��
* @params��
* @typeParam��
* @returns��
  ������ǣ��� or δ���ƣ���������Ҫ��
  ��ǩ��ָ����Ǻ�ע���в���ָ��ժҪ���ֻ򲿷֡�`@defaultValue` `@example` `@inheritDoc` `@inheritDoc` `@remarks`

��

```typescript
import { Serializer } from "example-library";


/**
 * ����ҳ��Ľӿ�
 * @public
 */
export interface IWidget {
    /**
     * ͨ����ʾ�ӿڻ���ҳ��
     * @param x - ҳ��X����
     * @param y - ҳ��Y����
     */
    public
    
    draw(x: number, y: number): void;
}


/** @public */
export class Button implements IWidget {
    /** {@inheritDoc IWidget.draw} */
    public draw(x: number, y: number): void {
    }
    
    /**
     * {@inheritDoc example-library#Serializer.writeFile}
     * @deprecated ʹ�� {@link example-library#Serializer.writeFile} ����.
     */
    public save(): void {
    }
}
```

### @internal

����ĺ���
ָ�� API ��ƻ��ɵ�����������Աʹ�á��ù��߿��ܻ��޼� ���Թ�����������������ĳЩ implementations �У�ĳЩָ������������ܱ�����
ʹ���ڲ� API ����磬��Ϊ�������ͬһ��Ʒ�������

��

```typescript
/**
 * ��ʾĿ¼�е�һ���顣
 * @public
 */
export class Book {
    /**
     * ��ı���.
     * @internal
     */
    public get _title(): string;
    
    /**
     * �������.
     */
    public get author(): string;
}
```

�ڴ�ʾ���У��Ӱ����� �����Ϊ `internal`��`Book.author` `@public` `Book._title`

### @label

�÷�
inline ��ǩ���ڱ���������Ա����ʹ�� TSDoc �������ñ�ʾ����`{@label}`

ע�⣺������δ����ȷ��������� GitHub ���� #9`{@label}`

��

```typescript
export interface Interface {
    /**
     * ��д:  {@link InterfaceL1.(:STRING_INDEXER)}
     * ȫ��:  {@link (InterfaceL1:interface).(:STRING_INDEXER)}
     *
     * {@label STRING_INDEXER}
     */
    [key: string]: number;
    
    /**
     * ��д:  {@link InterfaceL1.(:NUMBER_INDEXER)}
     * ȫ��:  {@link (InterfaceL1:interface).(:NUMBER_INDEXER)}
     *
     * {@label NUMBER_INDEXER}
     */
    [key: number]: number;
    
    /**
     * ��д:  {@link InterfaceL1.(:FUNCTOR)}
     * ȫ��:  {@link (InterfaceL1:interface).(:FUNCTOR)}
     *
     * {@label FUNCTOR}
     */
    (source: string, subString: string): boolean;
    
    /**
     * ��д:  {@link InterfaceL1.(:CONSTRUCTOR)}
     * ȫ��:  {@link (InterfaceL1:interface).(:CONSTRUCTOR)}
     *
     * {@label CONSTRUCTOR}
     */
    new(hour: number, minute: number);
}
```

### @link

�÷�
������ǩ���ڴ���ָ�� �ĵ�ϵͳ��ͨ�� Internet URL���ر��ǣ���֧�� �������� API ��ı��ʽ��`{@link}`

> [!NOTE]
> �������õķ�����δ����ȷ��������� GitHub ���� #9

��

```typescript
/**
 * ѧϰ���ʹ�� `{@link}` ��ǩ.
 *
 * @remarks
 *
 * ���ӿ���ָ��URL: {@link https://github.com/microsoft/tsdoc}
 *
 * ���ӿ���ָ��API��: {@link Button}
 *
 * ������ѡ������Զ��������ı�: {@link Button | the Button class}
 *
 * ���� `Button` �����ⲿ����һ���֡�����������£����ǿ��������ð�ʱ��������
 *
 * {@link my-control-library#Button | the Button class}
 *
 * �����ƿ��԰���NPM������͵���·��:
 *
 * {@link @microsoft/my-control-library/lib/Button#Button | the Button class}
 *
 * TSDoc��׼�����ֱ�ʾ����Ϊ���������á����÷���֧�ֶ���಻ͬ���͵�TypeScript���������á�
 * �˷��������Ϊ��`{@link}`��`{@hericDoc}`��ǩ��ʹ�ö���Ƶģ�����Ҳ�������Լ����Զ����ǩ��ʹ������
 *
 * ���磬`Button`������TypeScript�����ռ��һ����:
 *
 * {@link my-control-library#controls.Button | the Button class}
 *
 * ���ǿ��Դ���������һλ��Ա:
 *
 * {@link controls.Button.render | the render() method}
 *
 * �����̬��Ա��ʵ����Աͬ�������ǿ���ʹ��ѡ��������������:
 *
 * {@link controls.Button.(render:instance) | the render() method}
 *
 * {@link controls.Button.(render:static) | the render() static member}
 *
 * ��Ҳ���������������Ĺ��캯��:
 *
 * {@link controls.(Button:constructor) | the class constructor}
 *
 * ��ʱ��һ�����ư����������ַ����ǺϷ���TypeScript��ʶ��:
 *
 * {@link restProtocol.IServerResponse."first-name" | the first name property}
 *
 * ������һ���൱���ӵ����ӣ����к�������ECMAScript 6���ţ�����һ�����غ�����ʹ�ñ�ǩѡ������ʹ��`{@label}`TSDoc��ǩ���壩:
 *
 * {@link my-control-library#Button.([UISymbols.toNumberPrimitive]:OVERLOAD_1)
 * | the toNumberPrimitive() static member}
 *
 * �йء��������á����ŵĸ�����ϸ��Ϣ�������TSDoc�淶��
 * */
```

### @module

�ñ�ǩ���ڽ�ע�ͱ��Ϊ�����ļ��������������������� ������ѡ���Ե��������������� TypeDoc �´��ģ�顣`@module`

TSDoc ָ���� `@packageDocumentation` ��ǩҲ����������� �����ļ���ע�ͣ�����������������ģ�顣

ע�⣺ʹ�ñ�ǵ�ע�Ϳ�������ļ��еĵ�һ��ע�͡� ��ˣ����齫������ļ��������κ� import ���֮ǰ��`@module`

��

```typescript
// file1.ts
/**
 * This is the doc comment for file1.ts
 *
 * Specify this is a module comment and rename it to my-module:
 * @module my-module
 */
import * as lib from "lib";

// file2.ts
/**
 * Specify this is a module comment without renaming it:
 * @module
 */
import * as lib from "lib";

// file3.ts
/**
 * This is *not* a doc comment for the file, it is a doc comment for the import.
 * Include the `@module` or `@packageDocumentation` tag to mark it as a file comment.
 */
import * as lib from "lib";
```

### @namespace

�ñ�ǩ�����ڸ��� TypeDoc ������ת��Ϊ�����ռ䡣�⽫���� Ҫ��������¼Ϊ�����ı���/�������κ����ԡ�`@namespace`

��

```typescript
const a = 1;
const b = () => 2;
const c = { a, b, c: 3 };
/** @namespace */
export const d = { ...c, d: 4 };

// will be documented as if you wrote

export namespace d {
    export const a = 1;
    export const b = () => 2;
    export const c = 3;
    export const d = 4;
}
```

### @override

�÷�
�����η��� C# �� Java �еĹؼ��־������Ƶ����塣���ڳ�Ա���������ԣ� ��ʽ��ʾ�˶������ڸ��ǣ������¶��壩��
���ࡣ���ඨ��ͨ�����Ϊ .`override` `virtual`

�ĵ����߿���ǿ��,, ��/�� ���η�ʼ���� Ӧ�ã��� TSDoc ��׼��Ҫ����������`@virtual` `@override` `@sealed`

��
������Ĵ���ʾ���У����� virtual member ��`Child.render()` `Base.render()`

```typescript
class Base {
    /** @virtual */
    public render(): void {
    }
    
    /** @sealed */
    public initialize(): void {
    }
}


class Child extends Base {
    /** @override */
    public render(): void;
}
```

### @overload

�ñ�Ǳ�ʶ������ JavaScript ��Ŀ���� TypeScript 5.0 ��������Щ��Ŀ����ʹ�������������ء������Զ�����Ⱦ�� ���� --excludeTags
ѡ����ĵ�`@overload`

��

```typescript
/**
 * @overload
 * @param {string} value first signature
 * @return {void}
 */

/**
 * @overload
 * @param {number} value second signature
 * @param {number} [maximumFractionDigits]
 * @return {void}
 */

/**
 * @param {string | number} value
 * @param {number} [maximumFractionDigits]
 */
function printValue(value, maximumFractionDigits) {
}
```

### @packageDocumentation

�÷�
���ڱ�ʾ�������� NPM �����ĵ�ע�ͣ����������� ��ӵ��ð��У���ע��λ�� *.d.ts �ļ��У����ļ��䵱 ������Ӧ���Ǹ��ļ��������ĵ�һ��ע�͡�����
��ǩ������������������ API ��Ŀ��`@packageDocumentation` `/**` `@packageDocumentation`

��

```typescript
// Copyright (c) Example Company. All rights reserved. Licensed under the MIT license.

/**
 * ���ڴ���ҳ��Ŀ�.
 *
 * @remarks
 * The `widget-lib` defines the {@link IWidget} interface and {@link Widget} class,
 * which are used to build widgets.
 *
 * @packageDocumentation
 */

/**
 * Interface implemented by all widgets.
 * @public
 */
export interface IWidget {
    /**
     * Draws the widget on the screen.
     */
    render(): void;
}
```

### @param

�÷�
���ڼ�¼������������ǩ����������ƣ�������ַ� ���������`@param`

��

```typescript
/**
 * Returns the average of two numbers.
 *
 * @remarks
 * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
 *
 * @param x - The first input number
 * @param y - The second input number
 * @returns The arithmetic mean of `x` and `y`
 *
 * @beta
 */
function getAverage(x: number, y: number): number {
    return (x + y) / 2.0;
}
```

### @privateRemarks

�÷�
��ʼһ�������������ڵ������ĵ����ݲ��֡� ���߱���� API �ο���վ��ʡ���������֣����ɵ� *.d.ts �ļ��� �Լ��������ݵ��κ����������

��

```typescript
/**
 * ժҪ����Ӧ�ü�̡����ĵ���վ�ϣ�������ʾ��һ��ҳ���ϣ���ҳ���г�����಻ͬAPI��Ŀ��ժҪ���ڵ�����Ŀ����ϸ��Ϣҳ���ϣ�����ʾժҪ��Ȼ���Ǳ�ע���֣�����еĻ�����
 *
 * @remarks
 *
 * API�����Ҫ�ĵ�����Ϊһ����̵ġ�ժҪ�����֣������ѡ�ؼ��ϰ���������ϸ��Ϣ��`@remarks`�顣
 *
 * @privateRemarks
 *
 * `@privateRemarks`��ǩ��ʼ��һ�β������ⲿ���ڵĸ������ۡ��ĵ����߱����API�ο���վ��ʡ�Դ����ݡ������ɹ淶����.d.ts�ļ�ʱ��ҲӦ��ʡ������
 */
```

### @public

����ĺ���
ָ�� API ��ķ����׶�Ϊ ��public����������ʽ�����������������ߣ� ������ǩ����֤�ȶ������磬��ѭ����汾���ƹ��򣩡�

��

```typescript
/**
 * ��ʾĿ¼�е�һ���顣
 * @public
 */
export class Book {
    /**
     * ��ı��⡣
     * @internal
     */
    public get _title(): string;
    
    /**
     * ������ߡ�
     */
    public get author(): string;
}
```

�ڴ�ʾ���У��Ӱ����� �����Ϊ ��internal����`Book.author` `@publicBook._title`

### @property

��ǩ��������ǰ������Ӷ������ע�͡� ��ּ���� `@namespace` �� `@interface` ��ǩһ��ʹ��
����û�з����λ��������ÿ����Ա�����ۡ�`@property` `@prop`

��

```typescript
/**
 * This will be displayed as an interface
 * @property a comment for a
 * @prop b comment for b
 * @interface
 */
export type Resolved = Record<"a" | "b" | "c", string>;


// will be documented as if you wrote

/** This will be displayed as an interface */
export interface Resolved {
    /** comment for a */
    a: string;
    /** comment for b */
    b: string;
    c: string;
}
```

### @private

ͨ����Ӧʹ�ô˱�ǣ����ҿ��ܻ��ڽ����ķ��а���ɾ���˱�ǡ� �ñ�ǩ������Ŀɼ��Ը���Ϊ˽�С�`@private`

��

```typescript
export class Visibility {
    /** @private */
    member = 123;
}


// Will be documented as:
export class Visibility {
    private member = 123;
}
```

### @protected

ͨ����Ӧʹ�ô˱�ǣ����ҿ��ܻ��ڽ����ķ��а���ɾ���˱�ǡ� �ñ�ǽ�����Ҫ�����ķ���Ŀɼ��ԡ�@protected

��

```typescript
export class Visibility {
    /** @protected */
    member = 123;
}


// Will be documented as:
export class Visibility {
    protected member = 123;
}
```

### @readonly

�÷�
�����η����ָʾ API ��Ӧ��¼Ϊֻ������ʹ TypeScript type system ��������ָʾ�����磬����һ����������һ�� setter �������ú���ʼ��
����һ���쳣��˵���޷����������;����������£����η� ���Ա���������ĵ�����ʾΪֻ����`@readonly`

��

```typescript
export class Book {
    /**
     * �Ӽ����Ͻ���������һ�����������������ĵ�Ŀ�ģ���Ӧ����ֻ����ʽ���֡�
     *
     * @readonly
     */
    public get title(): string {
        return this._title;
    }
    
    public set title(value: string) {
        throw new Error("This property is read-only!");
    }
}
```

### @remarks

�μ� [@privateRemarks](#privateremarks)

### @returns

�÷�
���ڼ�¼�����ķ���ֵ��

��

```typescript
/**
 * Returns the average of two numbers.
 *
 * @remarks
 * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
 *
 * @param x - The first input number
 * @param y - The second input number
 * @returns The arithmetic mean of `x` and `y`
 *
 * @beta
 */
function getAverage(x: number, y: number): number {
    return (x + y) / 2.0;
}
```

### @sealed

�÷�
�����η��� C# �� Java �еĹؼ��־������Ƶ����塣�����ָ࣬ʾ ���಻�ô���̳С����ڳ�Ա���������ԣ�ָʾ����
���ø��ǣ������¶��壩��Ա��`sealed`

�ĵ����߿���ǿ�� ,, ��/�� ���η�ʼ���� Ӧ�ã��� TSDoc ��׼��Ҫ����������`@virtual` `@override` `@sealed`

��
������Ĵ���ʾ���У����������Ա �� �����ܱ����ǣ���Ϊ�������Ϊ
��sealed����`Child.render()` `Base.render()` `Base.initialize()`

```typescript
class Base {
    /** @virtual */
    public render(): void {
    }
    
    /** @sealed */
    public initialize(): void {
    }
}


class Child extends Base {
    /** @override */
    public render(): void;
}
```

### @see

�÷�
���ڹ����� API ���������Դ�������б���Щ��Դ������ ��ǰ��Ŀ��

> [!NOTE]
> JSDoc �᳢���� .��Ϊ����ģ�����ɵ� ���ڴ��ı���TSDoc ��Ҫһ����ʽ�ı�ǩ�����������ӡ�`@see` `{@link}`

��

```typescript
/**
 * Parses a string containing a Uniform Resource Locator (URL).
 * @see {@link ParsedUrl} for the returned data structure
 * @see {@link https://tools.ietf.org/html/rfc1738|RFC 1738}
 * for syntax
 * @see your developer SDK for code samples
 * @param url - the string to be parsed
 * @returns the parsed result
 */
function parseURL(url: string): ParsedUrl;
```

`@see`��һ�����ǩ��ÿ���鶼����Ϊ�����б��е�һ����Ŀ�����磬�ĵ� ϵͳ���ܻᰴ���·�ʽ���������飺

    `function parseURL(url: string): ParsedUrl;`

    Parses a string containing a Uniform Resource Locator (URL).

    ## See Also

    - ParsedUrl for the returned data structure
    - RFC 1738 for syntax
    - your developer SDK for code samples

### @throws

�÷�
���ڼ�¼�����ɺ����������������쳣���͡�

Ӧʹ�õ����Ŀ�����¼ÿ���쳣���͡��˱�ǩ������Ϣ Ŀ�ģ����Ҳ������׳��������͵����ǽ���ģ������Ǳ���ģ�
ʹ���Խ������쳣���Ƶ��п�ͷ��@throws@throws

���磺

```typescript
/**
 * Retrieves metadata about a book from the catalog.
 *
 * @param isbnCode - the ISBN number for the book
 * @returns the retrieved book object
 *
 * @throws {@link IsbnSyntaxError}
 * This exception is thrown if the input is not a valid ISBN number.
 *
 * @throws {@link book-lib#BookNotFoundError}
 * Thrown if the ISBN number is valid, but no such book exists in the catalog.
 *
 * @public
 */
function fetchBookByIsbn(isbnCode: string): Book;
```

### @typeParam

�÷�
���ڼ�¼���Ͳ�������ǩ���һ������ name ��ͷ�����һ�����ַ������һ�� description��TSDoc ������ʶ�� this �﷨����������ȡ��
DocParamBlock �ڵ��С�`@typeParam`

��

```typescript
/**
 * Alias for array
 *
 * @typeParam T - Type of objects the list contains
 */
type List<T> = Array<T>;


/**
 * Wrapper for an HTTP Response
 * @typeParam B - Response body
 * @param <H> - Headers
 */
interface HttpResponse<B, H> {
    body: B;
    headers: H;
    statusCode: number;
}
```

### @template
�ñ�ǩ���ڼ�¼�������������ࡢ�ӿڻ����ͱ��������Ͳ�����`@template`

TypeDoc ����ǩʶ��Ϊ�� JavaScript ���ݵı��� ͨ���ĵ�ע��ʹ�� TypeScript ����Ŀ������ TypeScript ��Ŀ��Ӧ��ѡ TSDoc ��׼ `@typeParam` ��ǡ�`@template` `@typeParam`

��
```typescript
/**
 * @template {string} T - the identity type
 */
export function identity<T>(x) {
  return x;
}
```


### @virtual

�÷�
�����η��� C# �� Java �еĹؼ��־������Ƶ����塣���ڳ�Ա���������ԣ� ��ʽָʾ������Ը��ǣ������¶��壩��Ա��`virtual`

�ĵ����߿���ǿ�� �� �� ��/�� ���η�ʼ���� Ӧ�ã��� TSDoc ��׼��Ҫ����������`@virtual` `@override` `@sealed`

��
������Ĵ���ʾ���У����� virtual member ��`Child.render()` `Base.render()`

```typescript
class Base {
    /** @virtual */
    public render(): void {
    }
    
    /** @sealed */
    public initialize(): void {
    }
}


class Child extends Base {
    /** @override */
    public render(): void;
}
```

### @satisfies

�˱�ǩ�� JSDoc �е� TypeScript 5.0 �� @satisfies ֧����ͬ��

Ĭ������£����� --excludeTags ѡ�����ء�

��

```typescript
/**
 * @satisfies {ConfigSettings}
 */
export const myConfigSettings = { ... };
```
