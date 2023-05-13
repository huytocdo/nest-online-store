import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('index')
  index() {
    const viewData = {};
    viewData['title'] = 'Home Page - Online Store';
    return {
      viewData: viewData,
    };
  }

  @Get('/about')
  @Render('about')
  about() {
    const viewData = {};
    viewData['description'] = 'This is an about page ...';
    viewData['author'] = 'Developed by: Huy Nguyen';
    viewData['subtitle'] = 'About us';
    viewData['title'] = 'About us - Online Store';
    return {
      viewData: viewData,
    };
  }
}
