'use client';

import {Component} from 'react';
import type {ReactNode} from 'react';

/**
 * A failed WebGLRenderer construction throws during render and would unmount
 * the whole page. Contain it so the CSS fallback keeps rendering.
 */
export class WebGLBoundary extends Component<{children:ReactNode},{failed:boolean}>{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true}}
 componentDidCatch(){/* keep the failure local to the field */}
 render(){return this.state.failed?null:this.props.children}
}
