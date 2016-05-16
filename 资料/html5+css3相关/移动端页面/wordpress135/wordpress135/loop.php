			<div class="panel panel-default post-list fade in">
				<div class="panel-body">
					<?php if(meta('fmimg1')) { ?>
					<div class="panel panel-default post-list in">
						<div class="panel-body">
							<div id="carousel-generic-<?php the_ID(); ?>" class="carousel slide">
								<!-- Indicators -->
								<ol class="carousel-indicators">
									<li data-target="#carousel-generic-<?php the_ID(); ?>" data-slide-to="0" class="active">
									</li>
									<?php if(meta('fmimg2')) { ?>
									<li data-target="#carousel-generic-<?php the_ID(); ?>" data-slide-to="1">
									</li>
									<?php } ?>
									<?php if(meta('fmimg3')) { ?>
									<li data-target="#carousel-generic-<?php the_ID(); ?>" data-slide-to="2">
									</li>
									<?php } ?>
									<?php if(meta('fmimg4')) { ?>
									<li data-target="#carousel-generic-<?php the_ID(); ?>" data-slide-to="2">
									</li>
									<?php } ?>
								</ol>
								<!-- Wrapper for slides -->
								<div class="carousel-inner">
									<div class="item active">
										<img src="<?php echo meta('fmimg1'); ?>">
									</div>
									<?php if(meta('fmimg2')) { ?>
									<div class="item">
										<img src="<?php echo meta('fmimg2'); ?>">
									</div>
									<?php } ?>
									<?php if(meta('fmimg3')) { ?>
									<div class="item">
										<img src="<?php echo meta('fmimg3'); ?>">
									</div>
									<?php } ?>
									<?php if(meta('fmimg4')) { ?>
									<div class="item">
										<img src="<?php echo meta('fmimg4'); ?>">
									</div>
									<?php } ?>
								</div>
								<!-- Controls -->
								<a class="left carousel-control" href="#carousel-generic-<?php the_ID(); ?>" data-slide="prev">
									<span class="glyphicon glyphicon-chevron-left">
									</span>
								</a>
								<a class="right carousel-control" href="#carousel-generic-<?php the_ID(); ?>" data-slide="next">
									<span class="glyphicon glyphicon-chevron-right">
									</span>
								</a>
							</div>
						</div>
					</div>
					<?php } ?>
					<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<?php the_excerpt(); ?>
				</div>
				<div class="panel-footer">
					<ul class="list-inline">
						<?php the_tags('<li><i class="glyphicon glyphicon-tags"></i> ',',','</li>'); ?>
						<li><i class="glyphicon glyphicon-eye-open"></i> <a href="<?php the_permalink(); ?>" rel="nofollow"><?php echo getPostViews(get_the_ID()); ?></a></li>
						<li><i class="glyphicon glyphicon-comment"></i> <a href="<?php the_permalink(); ?>#comment" rel="nofollow"><?php comments_number('0', '1', '%' );?></a></li>
					</ul>
				</div>
				<span class="glyphicon glyphicon-remove-circle remove" data-dismiss="alert" aria-hidden="true"></span>
			</div>