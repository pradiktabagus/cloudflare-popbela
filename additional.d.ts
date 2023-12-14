// Allow AMP elements to be a property on JSX.IntrinsicElements

// Only the intrinsic elements defined here will be accepted, and only with the attributes defined here
interface IScript
  extends React.DetailedHTMLProps<
    React.ScriptHTMLAttributes<HTMLScriptElement>,
    HTMLScriptElement
  > {
  [keyName: string]: any;
}
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
    script: IScript;
  }
}
