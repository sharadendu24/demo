function Tooltip(props){

    return ( <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement={props.name} title="Tooltip on right">
    Thanks for hovering I'm a tooltip on {props.name} side.
      </button>)
}

export default Tooltip;