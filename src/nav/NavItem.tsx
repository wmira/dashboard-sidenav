import * as React from 'react'
import { INavItemProp } from "react-sidenav/types/INavItemProp";
import { ISideNavContext } from 'react-sidenav/types';

type NavItemViewProp = INavItemProp & { onMouseEnter?: React.MouseEventHandler, onMouseLeave?: React.MouseEventHandler, onClick?: React.MouseEventHandler, context: ISideNavContext, children?: any }
export class NavItem extends React.PureComponent<NavItemViewProp, { isCollapsed: boolean, isCollapsible: boolean }> {
    public state = { isCollapsed: false, isCollapsible: true }

    constructor(props: NavItemViewProp) {
        super(props)
    }

    public render() {

        const { children, context, ...others } = this.props
        const { template } = this.props.context
        const Template = template.item //  isChild ? template.navChild || NavChildTemplate : ( template.nav || NavTemplate )


        return (
            <div onClick={this.dispatchOnClick} onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave}>
                <Template { ...others }>
                    { children || null }
                </Template>
            </div>
        )
    }

    private dispatchOnClick = () => {

        const arg = {
            id: this.props.navProp.id,
            path: this.props.pathId,
            payload: this.props.navProp.payload
        }
        if ( this.props.navProp.onClick ) {
            try {
                this.props.navProp.onClick({ ...arg })
            } catch ( e ){
                // ignored
            }
        }

        if ( this.props.context.onItemSelection  ) {
            this.props.context.onItemSelection(arg)
        }
    }
}
